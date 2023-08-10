/* eslint-disable @typescript-eslint/naming-convention */

import { TriggerConfig } from "./Trigger.interface";
import {
  Web3FunctionSchema,
  Web3FunctionUserArgs,
} from "./Web3FunctionSchema.interface";

export enum Module {
  RESOLVER,
  TIME,
  PROXY,
  SINGLE_EXEC,
  WEB3_FUNCTION,
  TRIGGER,
}

export interface ModuleData {
  modules: Module[];
  args: string[];
}

export interface ModuleArgsParams
  extends ResolverParams,
    ProxyParams,
    SingleExecParams,
    Web3FunctionParams,
    TriggerParams {}

export interface ResolverParams {
  resolverAddress: string | null;
  resolverData: string | null;
}

export interface ProxyParams {
  dedicatedMsgSender: boolean | null;
}
export interface SingleExecParams {
  singleExec: boolean | null;
}

export interface Web3FunctionParams {
  web3FunctionHash: string | null;
  web3FunctionArgs: Web3FunctionUserArgs | null;
  web3FunctionArgsHex: string | null;
  web3FunctionSchema?: Web3FunctionSchema;
}

export interface TriggerParams {
  trigger: TriggerConfig | null;
}
