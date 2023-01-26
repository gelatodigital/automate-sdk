import { Signer } from "@ethersproject/abstract-signer";
import { SiweMessage } from "siwe";
import { ChainId } from "../../types";

export class Signature {
  private readonly _timeTillExpiration = 600_000;
  private readonly _expirationBuffer = 300_000;
  private readonly _signer: Signer;
  private readonly _chainId: ChainId;
  private readonly _signatureMessage: string;

  private _lastExpirationTime!: number;
  private _token!: string;

  constructor(chainId: ChainId, signer: Signer, signatureMessage?: string) {
    this._chainId = chainId;
    this._signer = signer;
    this._signatureMessage =
      signatureMessage ?? "Gelato Web3Function secrets & storage";
  }

  public async getAuthToken(): Promise<string> {
    const timeNow = Date.now();
    if (
      !this._token ||
      !this._lastExpirationTime ||
      timeNow > this._lastExpirationTime - this._expirationBuffer
    )
      await this._requestAndStoreSignature();

    return this._token;
  }

  private async _requestAndStoreSignature(): Promise<void> {
    try {
      const domain = "app.gelato.network";
      const uri = "https://beta.app.gelato.network/";
      const address = await this._signer.getAddress();
      const version = "1";
      const chainId = this._chainId;
      const statement = this._signatureMessage;
      const expirationTimestamp = Date.now() + this._timeTillExpiration;
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
      const signature = await this._signer.signMessage(message);

      const authToken = Buffer.from(
        JSON.stringify({ message, signature })
      ).toString("base64");

      this._token = authToken;
      this._lastExpirationTime = expirationTimestamp;
    } catch (err) {
      throw new Error(`Signing message failed. \n${err.message}`);
    }
  }
}
