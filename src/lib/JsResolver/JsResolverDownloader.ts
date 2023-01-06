import axios, { Axios } from "axios";
import { OPS_USER_API } from "../../constants";
import { JsResolverSchema } from "../../types";
import { errorMessage } from "../../utils";

export class JsResolverDownloader {
  private readonly _userApi: Axios;

  constructor() {
    this._userApi = axios.create({
      baseURL: OPS_USER_API,
    });
  }

  public async fetchSchema(cid: string): Promise<JsResolverSchema> {
    try {
      const res = await this._userApi.get(
        `${OPS_USER_API}/users/js-resolver/${cid}/schema`
      );
      return res.data;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get schema for resolver "${cid}". \n${errMsg}`);
    }
  }
}
