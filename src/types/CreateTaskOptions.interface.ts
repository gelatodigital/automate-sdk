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
  polywrapHash?: string;
  polywrapArgs?: { [key: string]: unknown };
}

export interface CreateTaskOptionsWithModules extends CreateTaskOptions {
  useTreasury: boolean;
  moduleData: ModuleData;
}
