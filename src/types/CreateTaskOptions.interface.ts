import { ModuleData } from "./Module.interface";
import { TriggerConfig } from "./Trigger.interface";
import { Web3FunctionUserArgs } from "./Web3FunctionSchema.interface";

export interface CreateBatchExecTaskOptions {
  name: string;
  useTreasury?: boolean;
  singleExec?: boolean;
  web3FunctionHash: string;
  web3FunctionArgs?: Web3FunctionUserArgs;
  web3FunctionArgsHex?: string;
  triggerConfig: TriggerConfig;
}
export interface CreateTaskOptions {
  name: string;
  execAddress: string;
  execSelector: string;
  execData?: string;
  execAbi?: string;
  resolverAddress?: string;
  resolverData?: string;
  resolverAbi?: string;
  useTreasury?: boolean;
  dedicatedMsgSender: boolean;
  singleExec?: boolean;
  web3FunctionHash?: string;
  web3FunctionArgs?: Web3FunctionUserArgs;
  web3FunctionArgsHex?: string;
  triggerConfig: TriggerConfig;
}

export interface CreateTaskOptionsWithModules extends CreateTaskOptions {
  useTreasury: boolean;
  moduleData: ModuleData;
}
