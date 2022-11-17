import { Signer } from "@ethersproject/abstract-signer";
import { JsResolverSecrets } from "./JsResolverSecrets";

export class JsResolver {
  public secrets: JsResolverSecrets;

  constructor(signer: Signer) {
    this.secrets = new JsResolverSecrets(signer);
  }
}
