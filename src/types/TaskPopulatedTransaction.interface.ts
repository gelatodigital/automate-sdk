import { PopulatedTransaction } from "ethers";
import { CreateTaskOptionsWithModules } from "./CreateTaskOptions.interface";

export interface TaskPopulatedTransaction {
  taskId: string;
  tx: PopulatedTransaction;
  args: CreateTaskOptionsWithModules;
}
