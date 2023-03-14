import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import { Signature } from "./Signature";
import { AUTOMATE_USER_API } from "../../constants";
import { ChainId, Storage } from "../../types";
import { errorMessage } from "../../utils";

export class Web3FunctionStorage {
  private readonly _signer: Signer;
  private readonly _userApi: Axios;
  private _signature: Signature;

  constructor(signer: Signer, signature: Signature) {
    this._signer = signer;
    this._userApi = axios.create({
      baseURL: AUTOMATE_USER_API,
    });
    this._signature = signature;
  }

  public async get(chainId: ChainId, taskId: string): Promise<Storage> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await this._signature.getAuthToken();

      const res = await this._userApi.get(
        `/users/${address}/web3-function-storage/${chainId}/${taskId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      return res.data as Storage;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get storage for task "${taskId}". \n${errMsg}`);
    }
  }
}
