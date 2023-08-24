import axios, { Axios } from "axios";
import { AUTOMATE_USER_API, AUTOMATE_USER_STAGING_API } from "../../constants";
import { Config, Web3FunctionSchema } from "../../types";
import { errorMessage } from "../../utils";

export class Web3FunctionDownloader {
  private readonly _userApi: Axios;

  constructor(config?: Partial<Config>) {
    let userApiUrl: string = AUTOMATE_USER_API;
    if (config) {
      userApiUrl =
        config.userApi ?? config.isDevelopment
          ? AUTOMATE_USER_STAGING_API
          : AUTOMATE_USER_API;
    }

    this._userApi = axios.create({
      baseURL: userApiUrl,
    });
  }

  public async fetchSchema(cid: string): Promise<Web3FunctionSchema> {
    try {
      const res = await this._userApi.get(
        `${AUTOMATE_USER_API}/users/web3-function/${cid}/schema`,
      );
      return res.data;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(
        `Fail to get schema for Web3Function "${cid}". \n${errMsg}`,
      );
    }
  }
}
