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
}

export interface CreateTaskOptionsWithDefaults extends CreateTaskOptions {
  resolverAddress: string;
  resolverData: string;
  startTime: number;
  useTreasury: boolean;
}
