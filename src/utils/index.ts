import axios, { AxiosError } from "axios";

export function errorMessage(err: Error | AxiosError) {
  let errMsg = `${err.message} `;
  if (axios.isAxiosError(err)) {
    const data = err?.response?.data as { message?: string };
    if (data.message) errMsg += data.message;
  }

  return errMsg;
}
