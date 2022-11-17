import axios, { AxiosError } from "axios";
import { GELATO_ADDRESSES } from "../constants";

export function isGelatoOpsSupported(chainId: number): boolean {
  return Boolean(GELATO_ADDRESSES[chainId]);
}

export function errorMessage(err: Error | AxiosError) {
  let errMsg = `${err.message} `;
  if (axios.isAxiosError(err)) {
    const data = err?.response?.data as { message?: string };
    if (data.message) errMsg += data.message;
  }

  return errMsg;
}
