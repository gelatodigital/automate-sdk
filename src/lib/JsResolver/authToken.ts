import { Signer } from "@ethersproject/abstract-signer";
import { SiweMessage } from "siwe";

export type SiweOverride = Partial<SiweMessage>;

export const getAuthToken = async (
  signer: Signer,
  override?: SiweOverride
): Promise<string> => {
  try {
    const domain = "app.gelato.network";
    const uri = "http://beta.app.gelato.network/";
    const address = await signer.getAddress();
    const version = "1";
    const chainId = 1;
    const statement = "Sign this message to upload/fetch JsResolver";
    const expirationTimestamp = Date.now() + 600_000;
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

    const authToken = Buffer.from(
      JSON.stringify({ message, signature })
    ).toString("base64");

    return authToken;
  } catch (err) {
    throw new Error(`Signing message failed. \n${err.message}`);
  }
};
