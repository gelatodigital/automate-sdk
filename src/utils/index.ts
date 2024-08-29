import axios, { AxiosError } from "axios";
import { GELATO_ADDRESSES, W3F_API_ENDPOINT } from "../constants";
import { W3fNetwork } from "../types/W3FNetworks.interface";

export async function getNetwork(chainId: number): Promise<W3fNetwork | null> {
  try {
    const response = await axios.get<{ network: W3fNetwork }>(
      `${W3F_API_ENDPOINT}/${chainId}`,
    );

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

export async function isAutomateSupported(chainId: number): Promise<boolean> {
  return (await getNetwork(chainId)) !== null;
}

export async function isAutomateDevSupported(
  chainId: number,
): Promise<boolean> {
  return (
    (await isAutomateSupported(chainId)) &&
    Boolean(GELATO_ADDRESSES[chainId].automateDev)
  );
}

export function errorMessage(err: Error | AxiosError) {
  let errMsg = `${err.message} `;
  if (axios.isAxiosError(err)) {
    const data = err?.response?.data as { message?: string };
    if (data.message) errMsg += data.message;
  }

  return errMsg;
}
