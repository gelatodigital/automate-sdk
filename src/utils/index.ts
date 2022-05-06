import { GELATO_OPS_ADDRESSES } from "../constants";

export function isGelatoOpsSupported(chainId: number): boolean {
  return Boolean(GELATO_OPS_ADDRESSES[chainId]);
}
