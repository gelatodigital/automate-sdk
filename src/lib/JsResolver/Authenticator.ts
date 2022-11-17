import { Signer } from "@ethersproject/abstract-signer";
import { SiweMessage } from "siwe";

export class Authenticator {
  public readonly signer: Signer;
  private _authToken!: string;
  private _lastExpirationTime: number;

  constructor(signer: Signer) {
    this.signer = signer;
    this._lastExpirationTime = 0;
  }

  public async getAuthToken(): Promise<string> {
    try {
      if (Date.now() <= this._lastExpirationTime) return this._authToken;

      const domain = "app.gelato.network";
      const uri = "http://app.gelato.network/";
      const address = await this.signer.getAddress();
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
      });

      const message = siweMessage.prepareMessage();
      const signature = await this.signer.signMessage(message);

      const authToken = Buffer.from(
        JSON.stringify({ message, signature })
      ).toString("base64");

      this._lastExpirationTime = expirationTimestamp;
      this._authToken = authToken;

      return authToken;
    } catch (err) {
      throw new Error(`Signing message failed. \n${err.message}`);
    }
  }
}
