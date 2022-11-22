import { Signer } from "@ethersproject/abstract-signer";
import { JsResolverSecrets } from "./JsResolverSecrets";
import { JsResolverStorage } from "./JsResolverStorage";

export class JsResolver {
  public secrets: JsResolverSecrets;
  public storage: JsResolverStorage;

  constructor(signer: Signer) {
    this.secrets = new JsResolverSecrets(signer);
    this.storage = new JsResolverStorage(signer);
  }
}
