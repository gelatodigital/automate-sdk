/* eslint-disable no-prototype-builtins */
import "ethers";

import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import {
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  ethers,
  providers,
} from "ethers";
import {
  AUTOMATE_TASKS_API,
  AUTOMATE_TASKS_DEV_API,
  ETH,
  GELATO_ADDRESSES,
  ZERO_ADD,
} from "../constants";
import {
  Automate,
  AutomateProxyFactory,
  AutomateProxyFactory__factory,
  AutomateProxy__factory,
  Automate__factory,
  ProxyModule__factory,
} from "../contracts/types";
import {
  CancelTaskPopulatedTransaction,
  Config,
  CreateBatchExecTaskOptions,
  CreateTaskOptions,
  CreateTaskOptionsWithModules,
  CreateTaskPopulatedTransaction,
  Task,
  TaskApiParams,
  TaskTransaction,
} from "../types";
import { Module, ModuleData } from "../types/Module.interface";
import { errorMessage, isAutomateDevSupported, w3fApi } from "../utils";
import { AutomateModule } from "./AutomateModule";
import { Signature } from "./Signature";

export class AutomateSDK {
  private _automateModule: AutomateModule;
  private readonly _chainId: number;
  private readonly _signer: Signer;
  private _automate: Automate;
  private _opsProxyFactory: AutomateProxyFactory | undefined;
  private readonly _taskApi: Axios;
  private readonly _signature: Signature;

  private constructor(
    chainId: number,
    signer: Signer,
    automate: Automate,
    taskApi: Axios,
    signature: Signature,
  ) {
    this._automateModule = new AutomateModule();
    this._chainId = chainId;
    this._signer = signer;
    this._automate = automate;
    this._taskApi = taskApi;
    this._signature = signature;
  }

  public static async create(
    chainId: number,
    signer: Signer,
    signatureMessage?: string,
    config?: Partial<Config>,
  ): Promise<AutomateSDK> {
    let automateAddress: string;
    if (config && config.isDevelopment) {
      if (!(await isAutomateDevSupported(chainId))) {
        throw new Error(`AutomateDev is not available on chainId:${chainId}`);
      }

      automateAddress = GELATO_ADDRESSES[chainId].automateDev!;
    } else {
      const network = await w3fApi.getNetwork(chainId, config?.isDevelopment);
      if (!network) {
        throw new Error(`Automate is not available on chainId:${chainId}`);
      }

      automateAddress = network.automate;
    }

    if (!Signer.isSigner(signer)) {
      throw new Error(`Invalid Automate signer`);
    }

    const automate = Automate__factory.connect(automateAddress, signer);

    let taskApiUrl: string = AUTOMATE_TASKS_API;
    if (config) {
      taskApiUrl =
        config.taskApi ??
        (config.isDevelopment ? AUTOMATE_TASKS_DEV_API : AUTOMATE_TASKS_API);
    }
    const taskApi = axios.create({ baseURL: taskApiUrl });

    const signature = new Signature(
      chainId,
      signer,
      signatureMessage,
      config?.signatureDomain,
    );

    return new AutomateSDK(chainId, signer, automate, taskApi, signature);
  }

  public async getActiveTasks(creatorAddress?: string): Promise<Task[]> {
    // Retrieve user task ids
    const address = creatorAddress ?? (await this._signer.getAddress());
    const taskIds = await this._automate.getTaskIdsByUser(address);

    // Retrieve task names
    const path = `/tasks/${this._chainId}/getTasksByTaskIds`;
    const tasksNames = await this._postTaskApi<Task[]>(
      path,
      {
        taskIds,
      },
      true, // used to skip signature
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

  private async _getDedicatedMsgSender(creatorAddress: string): Promise<{
    address: string;
    isDeployed: boolean;
  }> {
    const opsProxyFactory = await this._getOpsProxyFactory();
    const [address, isDeployed] = await opsProxyFactory.getProxyOf(
      creatorAddress,
    );

    return { address, isDeployed };
  }

  private async _getOpsProxyFactory(): Promise<AutomateProxyFactory> {
    if (!this._opsProxyFactory) {
      const proxyModuleAddress = await this._automate.taskModuleAddresses(
        Module.PROXY,
      );

      const opsProxyFactoryAddress = await ProxyModule__factory.connect(
        proxyModuleAddress,
        this._signer,
      ).opsProxyFactory();

      const opsProxyFactory = AutomateProxyFactory__factory.connect(
        opsProxyFactoryAddress,
        this._signer,
      );

      this._opsProxyFactory = opsProxyFactory;
    }

    return this._opsProxyFactory;
  }

  public async getDedicatedMsgSender(): Promise<{
    address: string;
    isDeployed: boolean;
  }> {
    return this._getDedicatedMsgSender(await this._signer.getAddress());
  }

  public async getTaskId(
    _args: CreateTaskOptions,
    creatorAddress?: string,
  ): Promise<string> {
    const args = await this._processModules(_args);

    return this._getTaskId(args, creatorAddress);
  }

  protected async _getTaskId(
    args: CreateTaskOptionsWithModules,
    creatorAddress?: string,
  ): Promise<string> {
    const address = creatorAddress ?? (await this._signer.getAddress());
    const modules = args.moduleData.modules;

    if (
      (modules.length === 1 && modules[0] === Module.RESOLVER) ||
      (modules.length === 2 &&
        modules[0] === Module.RESOLVER &&
        modules[1] === Module.TIME)
    )
      return this._getLegacyTaskId(args, address);

    const taskId = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        [
          "address",
          "address",
          "bytes4",
          "tuple(uint8[] modules,bytes[] args)",
          "address",
        ],
        [
          address,
          args.execAddress,
          args.execSelector,
          args.moduleData,
          args.useTreasury ? ethers.constants.AddressZero : ETH,
        ],
      ),
    );
    return taskId;
  }

  protected async _getLegacyTaskId(
    args: CreateTaskOptionsWithModules,
    creatorAddress: string,
  ): Promise<string> {
    const resolverHash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["address", "bytes"],
        [args.resolverAddress, args.resolverData],
      ),
    );

    const taskId = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "bytes4", "bool", "address", "bytes32"],
        [
          creatorAddress,
          args.execAddress,
          args.execSelector,
          args.useTreasury,
          args.useTreasury ? ethers.constants.AddressZero : ETH,
          resolverHash,
        ],
      ),
    );
    return taskId;
  }

  private async _prepareBatchCreateTaskOptions(
    _args: CreateBatchExecTaskOptions,
    creatorAddress?: string,
  ): Promise<CreateTaskOptions> {
    creatorAddress = creatorAddress ?? (await this._signer.getAddress());
    const { address: execAddress } = await this._getDedicatedMsgSender(
      creatorAddress,
    );

    const automateProxyInterface = AutomateProxy__factory.createInterface();

    const execSelector = automateProxyInterface.getSighash("batchExecuteCall");

    const execAbi = automateProxyInterface.format("json") as string;

    const createTaskOptions: CreateTaskOptions = {
      ..._args,
      execAddress,
      execSelector,
      execAbi,
      dedicatedMsgSender: true,
    };
    return createTaskOptions;
  }

  public async prepareBatchExecTask(
    args: CreateBatchExecTaskOptions,
    overrides: Overrides = {},
    creatorAddress?: string,
  ): Promise<CreateTaskPopulatedTransaction> {
    const options = await this._prepareBatchCreateTaskOptions(
      args,
      creatorAddress,
    );
    return await this.prepareTask(options, overrides, creatorAddress);
  }

  public async createBatchExecTask(
    args: CreateBatchExecTaskOptions,
    overrides: Overrides = {},
    authToken?: string,
  ): Promise<TaskTransaction> {
    const createTaskOptions = await this._prepareBatchCreateTaskOptions(args);
    return await this.createTask(createTaskOptions, overrides, authToken);
  }

  public async prepareTask(
    _args: CreateTaskOptions,
    overrides: Overrides = {},
    creatorAddress?: string,
  ): Promise<CreateTaskPopulatedTransaction> {
    const args = await this._processModules(_args);
    const tx: PopulatedTransaction =
      await this._automate.populateTransaction.createTask(
        args.execAddress,
        args.execData ?? args.execSelector,
        args.moduleData,
        args.useTreasury ? ZERO_ADD : ETH,
        overrides,
      );

    const taskId = await this._getTaskId(args, creatorAddress);
    return { taskId, tx, args };
  }

  public async createTask(
    _args: CreateTaskOptions,
    overrides: Overrides = {},
    authToken?: string,
  ): Promise<TaskTransaction> {
    // Ask for signature
    if (!authToken) authToken = await this._signature.getAuthToken();

    const {
      taskId,
      args,
      tx: unsignedTx,
    } = await this.prepareTask(_args, overrides);

    const tx: ContractTransaction = await this._signer.sendTransaction(
      unsignedTx,
    );
    await this._finalizeTaskCreation(taskId, args, authToken);
    return { taskId, tx };
  }

  private async _processModules(
    args: CreateTaskOptions,
  ): Promise<CreateTaskOptionsWithModules> {
    const moduleData: ModuleData = await this._automateModule.encodeModuleArgs({
      resolverAddress: args.resolverAddress,
      resolverData: args.resolverData,
      dedicatedMsgSender: args.dedicatedMsgSender,
      singleExec: args.singleExec,
      web3FunctionHash: args.web3FunctionHash,
      web3FunctionArgs: args.web3FunctionArgs,
      web3FunctionArgsHex: args.web3FunctionArgsHex,
      trigger: args.trigger,
    });

    return { ...args, useTreasury: args.useTreasury ?? true, moduleData };
  }

  private async _finalizeTaskCreation(
    taskId: string,
    args: CreateTaskOptionsWithModules,
    authToken?: string,
  ): Promise<void> {
    // Post task name & contracts ABI to tasks API
    const { name, execAddress, execAbi, resolverAddress, resolverAbi } = args;
    const promises: Promise<void>[] = [];
    promises.push(this._setTaskName(taskId, name ?? taskId, authToken));
    if (execAbi) {
      promises.push(
        this._setContractAbi(taskId, false, execAddress, execAbi, authToken),
      );
    }
    if (resolverAddress && resolverAbi) {
      promises.push(
        this._setContractAbi(
          taskId,
          true,
          resolverAddress,
          resolverAbi,
          authToken,
        ),
      );
    }
    await Promise.all(promises);
  }

  public async prepareCancelTask(
    taskId: string,
    overrides: Overrides = {},
  ): Promise<CancelTaskPopulatedTransaction> {
    const tx = await this._automate.populateTransaction.cancelTask(
      taskId,
      overrides,
    );
    return { taskId, tx };
  }

  public async cancelTask(
    taskId: string,
    overrides: Overrides = {},
  ): Promise<TaskTransaction> {
    const { tx: unsignedTx } = await this.prepareCancelTask(taskId, overrides);

    const tx: ContractTransaction = await this._signer.sendTransaction(
      unsignedTx,
    );
    return { taskId, tx };
  }

  /**
   * @deprecated this function will be removed in next major upgrade
   */
  public isGnosisSafeApp = (): boolean => {
    let provider: providers.Provider | undefined;
    if (this._signer.provider?.hasOwnProperty("provider")) {
      // Use internal provider
      provider = (
        this._signer.provider as unknown as { provider: providers.Provider }
      ).provider;
    } else {
      provider = this._signer.provider;
    }
    return Boolean(provider?.hasOwnProperty("safe"));
  };

  private async _setTaskName(
    taskId: string,
    name: string,
    authToken?: string,
  ): Promise<void> {
    const path = `/tasks/${this._chainId}`;
    await this._postTaskApi(
      path,
      { taskId, name, chainId: this._chainId },
      false,
      authToken,
    );
  }

  public async renameTask(
    taskId: string,
    name: string,
    authToken?: string,
  ): Promise<void> {
    const path = `/tasks/${this._chainId}/${taskId}`;
    await this._postTaskApi(path, { name }, false, authToken);
  }

  private async _setContractAbi(
    taskId: string,
    isResolver: boolean,
    address: string,
    abi: string,
    authToken?: string,
  ): Promise<void> {
    const path = `/contracts/${this._chainId}/`;
    await this._postTaskApi(
      path,
      {
        chainId: this._chainId,
        taskId,
        address,
        resolver: isResolver,
        ABI: abi,
      },
      false,
      authToken,
    );
  }

  private async _postTaskApi<Response>(
    path: string,
    data: TaskApiParams,
    skipSignature = false,
    authToken?: string,
  ): Promise<Response | undefined> {
    const headers: { [key: string]: string } = {};
    if (!skipSignature) {
      if (!authToken) authToken = await this._signature.getAuthToken();
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    try {
      const response = await this._taskApi.post(`${path}`, data, { headers });
      return response.data as Response;
    } catch (err) {
      const errMsg = errorMessage(err);
      console.error(`Error naming task for task ${data.taskId}. \n${errMsg}`);

      return undefined;
    }
  }
}
