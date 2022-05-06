import "ethers";

import { Signer } from "@ethersproject/abstract-signer";
import { GELATO_OPS_ADDRESSES, OPS_TASKS_API } from "../constants";
import { Ops, Ops__factory } from "../contracts/types";
import { ContractTransaction } from "ethers";
import { Task, TaskApiParams, TaskReceipt } from "../types";
import axios from "axios";
import { isGelatoOpsSupported } from "../utils";

export class GelatoOpsSDK {
  private _chainId: number;
  private _signer: Signer;
  private _ops: Ops;

  constructor(chainId: number, signer: Signer) {
    if (!isGelatoOpsSupported(chainId)) {
      throw new Error(`Gelato Ops is not available on chainId:${chainId}`);
    }
    if (!Signer.isSigner(signer)) {
      throw new Error(`Invalid Gelato Ops signer`);
    }

    this._chainId = chainId;
    this._signer = signer;
    this._ops = Ops__factory.connect(
      GELATO_OPS_ADDRESSES[this._chainId],
      this._signer
    );
  }

  public async getActiveTasks(): Promise<Task[]> {
    // Retrieve user task ids
    const address = await this._signer.getAddress();
    const taskIds = await this._ops.getTaskIdsByUser(address);

    // Retrieve task names
    const path = `/tasks/${this._chainId}/getTasksByTaskIds`;
    const tasksNames = await this._postTaskApi<Task[]>(path, {
      taskIds,
    });
    console.log(tasksNames);

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

  public async createTask(
    executorAddress: string,
    executorSelector: string,
    resolverAddress: string,
    resolverData: string,
    name?: string
  ): Promise<TaskReceipt> {
    // Create task on chain
    const tx: ContractTransaction = await this._ops.createTask(
      executorAddress,
      executorSelector,
      resolverAddress,
      resolverData
    );
    const taskReceipt: TaskReceipt = await tx.wait();

    // Retrieve taskId from TaskCreated event
    const taskCreated = taskReceipt.events?.find(
      (e) => e.event === "TaskCreated"
    );
    if (taskCreated && taskCreated.args?.taskId) {
      const taskId = taskCreated.args.taskId;
      taskReceipt.taskId = taskId;
      // And post task name to tasks API
      await this._createTaskName(taskId, name ?? taskId);
    }

    return taskReceipt;
  }

  public async cancelTask(taskId: string): Promise<TaskReceipt> {
    const tx = await this._ops.cancelTask(taskId);
    const taskReceipt: TaskReceipt = await tx.wait();
    taskReceipt.taskId = taskId;
    return taskReceipt;
  }

  private async _createTaskName(taskId: string, name: string): Promise<void> {
    const path = `/tasks/${this._chainId}`;
    await this._postTaskApi(path, { taskId, name, chainId: this._chainId });
  }

  public async renameTask(taskId: string, name: string): Promise<void> {
    const path = `/tasks/${this._chainId}/${taskId}`;
    await this._postTaskApi(path, { name });
  }

  private async _postTaskApi<Response>(
    path: string,
    data: TaskApiParams
  ): Promise<Response | undefined> {
    try {
      const message = "Gelato Ops Task";
      const signature = await this._signer.signMessage(message);
      const token = Buffer.from(
        JSON.stringify({ signature, message })
      ).toString("base64");

      const response = await axios.post(`${OPS_TASKS_API}${path}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
