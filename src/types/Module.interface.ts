/* eslint-disable @typescript-eslint/naming-convention */

export enum Module {
  RESOLVER,
  TIME,
  PROXY,
  SINGLE_EXEC,
  ORESOLVER,
}

export interface ModuleData {
  modules: Module[];
  args: string[];
}

export interface ModuleArgs
  extends Partial<ResolverParams>,
    Partial<TimeParams>,
    Partial<ProxyParams>,
    Partial<SingleExecParams>,
    Partial<OffChainResolverParams> {}

export interface ResolverParams {
  resolverAddress: string | null;
  resolverData: string | null;
}

export interface TimeParams {
  startTime: number | null;
  interval: number | null;
}

export interface ProxyParams {
  proxy: boolean | null;
}
export interface SingleExecParams {
  singleExec: boolean | null;
}
export interface OffChainResolverParams {
  offChainResolverHash: string | null;
  offChainResolverArgs: { [key: string]: unknown } | null;
}
