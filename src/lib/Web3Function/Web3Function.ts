import { Signer } from "@ethersproject/abstract-signer";
import { Signature } from "./Signature";
import { ChainId } from "../../types";
import { Web3FunctionSecrets } from "./Web3FunctionSecrets";
import { Web3FunctionStorage } from "./Web3FunctionStorage";

export class Web3Function {
  public secrets: Web3FunctionSecrets;
  public storage: Web3FunctionStorage;
  private _signature: Signature;

  constructor(chainId: ChainId, signer: Signer, signatureMessage?: string) {
    this._signature = new Signature(chainId, signer, signatureMessage);
    this.secrets = new Web3FunctionSecrets(signer, this._signature);
    this.storage = new Web3FunctionStorage(signer, this._signature);
  }
}
