import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import { getAuthToken } from "./authToken";
import { OPS_USER_API } from "../../constants";
import { Secrets } from "../../types";
import { errorMessage } from "../../utils";

export class JsResolverSecrets {
  private readonly _signer: Signer;
  private readonly _userApi: Axios;

  constructor(signer: Signer) {
    this._signer = signer;
    this._userApi = axios.create({
      baseURL: OPS_USER_API,
    });
  }

  public async get(key: string): Promise<string> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      const res = await this._userApi.get(`/users/${address}/secrets/${key}`, {
        headers: { Authorization: authToken },
      });

      const secret = res.data[key];
      if (secret === undefined)
        throw new Error(`Secret not found for key: ${key}`);

      return res.data[key] as string;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get secret for key "${key}". \n${errMsg}`);
    }
  }

  public async list(): Promise<Secrets> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      const res = await this._userApi.get(`/users/${address}/secrets`, {
        headers: { Authorization: authToken },
      });

      return res.data as Secrets;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to list all secrets. \n${errMsg}`);
    }
  }

  public async create(secrets: Secrets): Promise<void> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      await this._userApi.post(
        `/users/${address}/secrets`,
        { ...secrets, asdfsf: 1 },
        {
          headers: { Authorization: authToken },
        }
      );
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to create secrets. \n${errMsg}`);
    }
  }

  public async update(key: string, secret: string): Promise<void> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      await this._userApi.put(
        `/users/${address}/secrets/${key}`,
        { [key]: secret },
        {
          headers: { Authorization: authToken },
        }
      );
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to update secret "${key}". \n${errMsg}`);
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      const address = await this._signer.getAddress();
      const authToken = await getAuthToken(this._signer);

      await this._userApi.delete(`/users/${address}/secrets/${key}`, {
        headers: { Authorization: authToken },
      });
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to delete secret "${key}". \n${errMsg}`);
    }
  }
}
