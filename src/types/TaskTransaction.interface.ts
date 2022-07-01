import { ContractTransaction } from "ethers";

export interface TaskTransaction {
  taskId?: string;
  tx: ContractTransaction;
}
