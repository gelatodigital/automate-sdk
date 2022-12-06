import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import { getAuthToken } from "./authToken";
import { OPS_USER_API } from "../../constants";
import { ChainId, Storage } from "../../types";
import { errorMessage } from "../../utils";

export class JsResolverStorage {
  private readonly _signer: Signer;
  private readonly _userApi: Axios;

  constructor(signer: Signer) {
    this._signer = signer;
    this._userApi = axios.create({
      baseURL: OPS_USER_API,
    });
  }

  public async get(chainId: ChainId, taskId: string): Promise<Storage> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      const res = await this._userApi.get(
        `/users/${address}/resolver-storage/${chainId}/${taskId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      return res.data as Storage;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get storage for task "${taskId}". \n${errMsg}`);
    }
  }
}
