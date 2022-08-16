/* eslint-disable @typescript-eslint/naming-convention */

export enum Module {
  RESOLVER,
  TIME,
  PROXY,
  SINGLE_EXEC,
  POLYWRAP,
}

export interface ModuleData {
  modules: Module[];
  args: string[];
}
