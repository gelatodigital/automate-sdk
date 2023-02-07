import { Web3FunctionUserArgs } from "./Web3FunctionSchema.interface";
import { ModuleData } from "./Module.interface";

export interface CreateTaskOptions {
  name: string;
  execAddress: string;
  execSelector: string;
  execData?: string;
  execAbi?: string;
  resolverAddress?: string;
  resolverData?: string;
  resolverAbi?: string;
  startTime?: number;
  interval?: number;
  useTreasury?: boolean;
  dedicatedMsgSender: boolean;
  singleExec?: boolean;
  web3FunctionHash?: string;
  web3FunctionArgs?: Web3FunctionUserArgs;
  web3FunctionArgsHex?: string;
}

export interface CreateTaskOptionsWithModules extends CreateTaskOptions {
  useTreasury: boolean;
  moduleData: ModuleData;
}
