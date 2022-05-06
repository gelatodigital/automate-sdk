import { ContractReceipt } from "ethers";

export interface TaskReceipt extends ContractReceipt {
  taskId?: string;
}
