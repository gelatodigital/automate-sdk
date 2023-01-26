import axios, { Axios } from "axios";
import { OPS_USER_API } from "../../constants";
import { Web3FunctionSchema } from "../../types";
import { errorMessage } from "../../utils";

export class Web3FunctionDownloader {
  private readonly _userApi: Axios;

  constructor() {
    this._userApi = axios.create({
      baseURL: OPS_USER_API,
    });
  }

  public async fetchSchema(cid: string): Promise<Web3FunctionSchema> {
    try {
      const res = await this._userApi.get(
        `${OPS_USER_API}/users/web3-function/${cid}/schema`
      );
      return res.data;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(
        `Fail to get schema for Web3Function "${cid}". \n${errMsg}`
      );
    }
  }
}
