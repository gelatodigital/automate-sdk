import { TransactionResponse } from "ethers";

export interface TaskTransaction {
  taskId?: string;
  tx: TransactionResponse;
}
