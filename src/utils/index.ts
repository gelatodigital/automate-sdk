import axios, { AxiosError } from "axios";
import { W3F_API_ENDPOINT, W3F_API_ENDPOINT_DEV } from "../constants";
import { W3fNetwork } from "../types/W3fNetworks.interface";

class W3FApi {
  private _network: Map<number, string> = new Map();

  public async getNetwork(
    chainId: number,
    isDevelopment?: boolean,
  ): Promise<W3fNetwork | null> {
    try {
      const cacheNetwork = this._network.get(chainId);
      if (cacheNetwork !== undefined) {
        return JSON.parse(cacheNetwork) as W3fNetwork;
      }

      const endpoint = isDevelopment ? W3F_API_ENDPOINT_DEV : W3F_API_ENDPOINT;

      const response = await axios.get<{ network: W3fNetwork }>(
        `${endpoint}/${chainId}`,
      );

      this._network.set(chainId, JSON.stringify(response.data.network));

      return response.data.network;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 404) {
          console.error("Error getting network:", error.message);
        }
      } else {
        console.error("Unexpected error getting network:", error);
      }

      return null;
    }
  }
}

export const w3fApi = new W3FApi();

export async function isAutomateSupported(chainId: number): Promise<boolean> {
  return (await w3fApi.getNetwork(chainId)) !== null;
}

export async function isAutomateDevSupported(
  chainId: number,
): Promise<boolean> {
  return (await w3fApi.getNetwork(chainId, true)) !== null;
}

export function errorMessage(err: Error | AxiosError) {
  let errMsg = `${err.message} `;
  if (axios.isAxiosError(err)) {
    const data = err?.response?.data as { message?: string };
    if (data.message) errMsg += data.message;
  }

  return errMsg;
}
