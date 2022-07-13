import "ethers";

import { Signer } from "@ethersproject/abstract-signer";
import { GELATO_ADDRESSES, OPS_TASKS_API, ETH } from "../constants";
import {
  Ops,
  Ops__factory,
  Forwarder,
  Forwarder__factory,
} from "../contracts/types";
import { ContractTransaction, ethers, Overrides } from "ethers";
import {
  CreateTaskOptions,
  CreateTaskOptionsWithDefaults,
  Task,
  TaskApiParams,
  TokenData,
} from "../types";
import axios from "axios";
import { isGelatoOpsSupported } from "../utils";
import { TaskTransaction } from "../types/TaskTransaction.interface";

export class GelatoOpsSDK {
  private readonly _chainId: number;
  private readonly _signer: Signer;
  private _ops: Ops;
  private _forwarder: Forwarder;
  private _token!: string;
  private readonly _signatureMessage: string;

  constructor(chainId: number, signer: Signer, signatureMessage?: string) {
    if (!isGelatoOpsSupported(chainId)) {
      throw new Error(`Gelato Ops is not available on chainId:${chainId}`);
    }
    if (!Signer.isSigner(signer)) {
      throw new Error(`Invalid Gelato Ops signer`);
    }

    this._signatureMessage = signatureMessage ?? "Gelato Ops Task";
    this._chainId = chainId;
    this._signer = signer;
    this._ops = Ops__factory.connect(
      GELATO_ADDRESSES[this._chainId].ops,
      this._signer
    );
    this._forwarder = Forwarder__factory.connect(
      GELATO_ADDRESSES[this._chainId].forwarder,
      this._signer
    );
  }

  public async getActiveTasks(): Promise<Task[]> {
    // Retrieve user task ids
    const address = await this._signer.getAddress();
    const taskIds = await this._ops.getTaskIdsByUser(address);

    // Retrieve task names
    const path = `/tasks/${this._chainId}/getTasksByTaskIds`;
    const tasksNames = await this._postTaskApi<Task[]>(
      path,
      {
        taskIds,
      },
      true // used to skip signature
    );

    // Build results
    const tasks: Task[] = [];
    for (const taskId of taskIds) {
      const taskName = tasksNames?.find((t) => t.taskId === taskId);
      tasks.push({
        taskId,
        name: taskName ? taskName.name : taskId,
      });
    }
    return tasks;
  }

  public async getTaskId(_args: CreateTaskOptions): Promise<string> {
    return this._getTaskId(this._addDefaultOptions(_args));
  }

  protected async _getTaskId(
    args: CreateTaskOptionsWithDefaults
  ): Promise<string> {
    const address = await this._signer.getAddress();

    const resolverHash = ethers.utils.keccak256(
      new ethers.utils.AbiCoder().encode(
        ["address", "bytes"],
        [args.resolverAddress, args.resolverData]
      )
    );

    const taskId = ethers.utils.keccak256(
      new ethers.utils.AbiCoder().encode(
        ["address", "address", "bytes4", "bool", "address", "bytes32"],
        [
          address,
          args.execAddress,
          args.execSelector,
          args.useTreasury,
          args.useTreasury ? ethers.constants.AddressZero : ETH,
          resolverHash,
        ]
      )
    );
    return taskId;
  }

  public async createTask(
    _args: CreateTaskOptions,
    overrides: Overrides = {}
  ): Promise<TaskTransaction> {
    const args = this._addDefaultOptions(_args);

    // Ask for signature
    if (!this._token) await this._requestAndStoreSignature();

    // Create task using appropriate contract method
    let tx: ContractTransaction;
    if (args.interval) {
      tx = await this._ops.createTimedTask(
        args.startTime,
        args.interval,
        args.execAddress,
        args.execSelector,
        args.resolverAddress,
        args.resolverData,
        ETH,
        args.useTreasury,
        overrides
      );
    } else if (!args.useTreasury) {
      tx = await this._ops.createTaskNoPrepayment(
        args.execAddress,
        args.execSelector,
        args.resolverAddress,
        args.resolverData,
        ETH,
        overrides
      );
    } else {
      tx = await this._ops.createTask(
        args.execAddress,
        args.execSelector,
        args.resolverAddress,
        args.resolverData,
        overrides
      );
    }
    const taskId = await this._getTaskId(args);
    await this._finalizeTaskCreation(taskId, args);
    return { taskId, tx };
  }

  private _addDefaultOptions(
    args: CreateTaskOptions
  ): CreateTaskOptionsWithDefaults {
    return {
      ...args,
      startTime: args.startTime ?? 0,
      useTreasury: args.useTreasury ?? true,
      resolverAddress: args.resolverAddress ?? this._forwarder.address,
      resolverData:
        args.resolverData ??
        this._forwarder.interface.encodeFunctionData("checker", [
          args.execData ?? [],
        ]),
    };
  }

  private async _finalizeTaskCreation(
    taskId: string,
    args: CreateTaskOptionsWithDefaults
  ): Promise<void> {
    // Post task name & contracts ABI to tasks API
    const { name, execAddress, execAbi, resolverAddress, resolverAbi } = args;
    const promises: Promise<void>[] = [];
    promises.push(this._setTaskName(taskId, name ?? taskId));
    if (execAbi) {
      promises.push(this._setContractAbi(taskId, false, execAddress, execAbi));
    }
    if (resolverAddress && resolverAbi) {
      promises.push(
        this._setContractAbi(taskId, true, resolverAddress, resolverAbi)
      );
    }
    await Promise.all(promises);
  }

  public async cancelTask(
    taskId: string,
    overrides: Overrides = {}
  ): Promise<TaskTransaction> {
    const tx = await this._ops.cancelTask(taskId, overrides);
    return { taskId, tx };
  }

  public isGnosisSafeApp = (): boolean => {
    // eslint-disable-next-line no-prototype-builtins
    return Boolean(this._signer.provider?.hasOwnProperty("safe"));
  };

  private async _requestAndStoreSignature() {
    const tokenData: TokenData = {
      message: this._signatureMessage,
      origin: "SDK",
    };
    if (this.isGnosisSafeApp()) {
      tokenData.unsignedUser = await this._signer.getAddress();
    } else {
      tokenData.signature = await this._signer.signMessage(
        this._signatureMessage
      );
    }
    this._token = Buffer.from(JSON.stringify(tokenData)).toString("base64");

    // Set Axios headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${this._token}`;
  }

  private async _setTaskName(taskId: string, name: string): Promise<void> {
    const path = `/tasks/${this._chainId}`;
    await this._postTaskApi(path, { taskId, name, chainId: this._chainId });
  }

  public async renameTask(taskId: string, name: string): Promise<void> {
    if (this.isGnosisSafeApp()) {
      throw new Error("Cannot rename task from a gnosis safe");
    }

    const path = `/tasks/${this._chainId}/${taskId}`;
    await this._postTaskApi(path, { name });
  }

  private async _setContractAbi(
    taskId: string,
    isResolver: boolean,
    address: string,
    abi: string
  ): Promise<void> {
    const path = `/contracts/${this._chainId}/`;
    await this._postTaskApi(path, {
      chainId: this._chainId,
      taskId,
      address,
      resolver: isResolver,
      ABI: abi,
    });
  }

  private async _postTaskApi<Response>(
    path: string,
    data: TaskApiParams,
    skipSignature = false
  ): Promise<Response | undefined> {
    if (!skipSignature && !this._token) {
      await this._requestAndStoreSignature();
    }
    try {
      const response = await axios.post(`${OPS_TASKS_API}${path}`, data);
      return response.data as Response;
    } catch (error) {
      this._logTaskApiError(error);
      return undefined;
    }
  }

  private _logTaskApiError(error: Error) {
    // Task API error are logged but not thrown as they are non blocking
    let message = `GelatoOpsSDK - Error naming task: ${error.message} `;
    if (axios.isAxiosError(error)) {
      message += error.response?.data?.message;
    }
    console.error(message);
  }
}
