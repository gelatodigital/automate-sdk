/* eslint-disable @typescript-eslint/naming-convention */

export enum Module {
  RESOLVER,
  TIME,
  PROXY,
  SINGLE_EXEC,
}

export interface ModuleData {
  modules: Module[];
  args: string[];
}

export interface ModuleArgsParams
  extends ResolverParams,
    TimeParams,
    ProxyParams,
    SingleExecParams {}

export interface ResolverParams {
  resolverAddress: string | null;
  resolverData: string | null;
}

export interface TimeParams {
  startTime: number | null;
  interval: number | null;
}

export interface ProxyParams {
  dedicatedMsgSender: boolean | null;
}
export interface SingleExecParams {
  singleExec: boolean | null;
}
