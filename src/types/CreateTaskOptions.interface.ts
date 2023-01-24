import { JsResolverUserArgs } from "./Web3FunctionSchema.interface";
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
  offChainResolverHash?: string;
  offChainResolverArgs?: { [key: string]: unknown };
  jsResolverHash?: string;
  jsResolverArgs?: JsResolverUserArgs;
  jsResolverArgsHex?: string;
}

export interface CreateTaskOptionsWithModules extends CreateTaskOptions {
  useTreasury: boolean;
  moduleData: ModuleData;
}
