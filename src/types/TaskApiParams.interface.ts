export interface TaskApiParams {
  taskIds?: string[];
  taskId?: string;
  chainId?: number | string;
  name?: string;
  resolver?: boolean;
  address?: string;
  ABI?: string; // eslint-disable-line @typescript-eslint/naming-convention
}
