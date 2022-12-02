import { Signer } from "@ethersproject/abstract-signer";
import { SiweMessage } from "siwe";
import { AUTH_DEFAULTS } from "../constants";

export type SiweOverride = Partial<SiweMessage>;

export const getAuthToken = async (
  signer: Signer,
  override?: SiweOverride
): Promise<string> => {
  try {
    const domain = AUTH_DEFAULTS.domain;
    const uri = AUTH_DEFAULTS.uri;
    const address = await signer.getAddress();
    const version = AUTH_DEFAULTS.version;
    const chainId = AUTH_DEFAULTS.chainId;
    const statement = AUTH_DEFAULTS.statement;
    const expirationTimestamp = Date.now() + AUTH_DEFAULTS.expirationTimestamp;
    const expirationTime = new Date(expirationTimestamp).toISOString();

    const siweMessage = new SiweMessage({
      domain,
      statement,
      uri,
      address,
      version,
      chainId,
      expirationTime,
      ...override,
    });

    const message = siweMessage.prepareMessage();
    const signature = await signer.signMessage(message);

    return Buffer.from(JSON.stringify({ message, signature })).toString(
      "base64"
    );
  } catch (err) {
    throw new Error(`Signing message failed. \n${err.message}`);
  }
};
