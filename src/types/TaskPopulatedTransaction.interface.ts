import { PopulatedTransaction } from "ethers";
import { CreateTaskOptionsWithModules } from "./CreateTaskOptions.interface";

export interface CreateTaskPopulatedTransaction {
  taskId: string;
  tx: PopulatedTransaction;
  args: CreateTaskOptionsWithModules;
}

export interface CancelTaskPopulatedTransaction {
  taskId: string;
  tx: PopulatedTransaction;
}
