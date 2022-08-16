import { GELATO_ADDRESSES } from "../constants";

export function isAutomateSupported(chainId: number): boolean {
  return Boolean(GELATO_ADDRESSES[chainId]);
}

export * from "./taskModules";
