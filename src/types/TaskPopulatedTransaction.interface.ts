import { ContractTransaction } from "ethers";
import { CreateTaskOptionsWithModules } from "./CreateTaskOptions.interface";

export interface CreateTaskPopulatedTransaction {
  taskId: string;
  tx: ContractTransaction;
  args: CreateTaskOptionsWithModules;
}

export interface CancelTaskPopulatedTransaction {
  taskId: string;
  tx: ContractTransaction;
}
