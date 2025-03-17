import { Signer } from "ethers";
import axios, { Axios } from "axios";
import { AUTOMATE_USER_API, AUTOMATE_USER_DEV_API } from "../../constants";
import { ChainId, Config, Storage } from "../../types";
import { errorMessage } from "../../utils";
import { Signature } from "../Signature";

export class Web3FunctionStorage {
  private readonly _signer: Signer;
  private readonly _userApi: Axios;
  private _signature: Signature;

  constructor(signer: Signer, signature: Signature, config?: Partial<Config>) {
    this._signer = signer;

    let userApiUrl: string = AUTOMATE_USER_API;
    if (config) {
      userApiUrl =
        config.userApi ?? config.isDevelopment
          ? AUTOMATE_USER_DEV_API
          : AUTOMATE_USER_API;
    }
    this._userApi = axios.create({
      baseURL: userApiUrl,
    });

    this._signature = signature;
  }

  public async get(
    chainId: ChainId,
    taskId: string,
    authToken?: string,
  ): Promise<Storage> {
    try {
      const address = await this._signer.getAddress();
      if (!authToken) authToken = await this._signature.getAuthToken();

      const res = await this._userApi.get(
        `/users/${address}/web3-function-storage/${chainId}/${taskId}`,
        { headers: { Authorization: `Bearer ${authToken}` } },
      );

      return res.data as Storage;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get storage for task "${taskId}". \n${errMsg}`);
    }
  }
}
