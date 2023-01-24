import { Signer } from "@ethersproject/abstract-signer";
import { Signature } from "./Signature";
import { ChainId } from "../../types";
import { JsResolverSecrets } from "./Web3FunctionSecrets";
import { JsResolverStorage } from "./Web3FunctionStorage";

export class JsResolver {
  public secrets: JsResolverSecrets;
  public storage: JsResolverStorage;
  private _signature: Signature;

  constructor(chainId: ChainId, signer: Signer, signatureMessage?: string) {
    this._signature = new Signature(chainId, signer, signatureMessage);
    this.secrets = new JsResolverSecrets(signer, this._signature);
    this.storage = new JsResolverStorage(signer, this._signature);
  }
}
