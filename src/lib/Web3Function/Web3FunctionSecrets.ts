import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import { Signature } from "../Signature";
import { AUTOMATE_USER_API } from "../../constants";
import { Secrets } from "../../types";
import { errorMessage } from "../../utils";

export class Web3FunctionSecrets {
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

  public async get(
    key: string,
    taskId?: string,
    authToken?: string
  ): Promise<string> {
    try {
      const address = await this._signer.getAddress();
      const chainId = await this._signer.getChainId();
      if (!authToken) authToken = await this._signature.getAuthToken();

      const route = taskId
        ? `/users/${address}/secrets/${key}/${chainId}/${taskId}`
        : `/users/${address}/secrets/${key}`;

      const res = await this._userApi.get(route, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const secret = res.data[key];

      return secret;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to get secret for key "${key}". \n${errMsg}`);
    }
  }

  public async list(taskId?: string, authToken?: string): Promise<Secrets> {
    try {
      const address = await this._signer.getAddress();
      const chainId = await this._signer.getChainId();
      if (!authToken) authToken = await this._signature.getAuthToken();

      const route = taskId
        ? `/users/${address}/secrets/${chainId}/${taskId}`
        : `/users/${address}/secrets`;

      const res = await this._userApi.get(route, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return res.data as Secrets;
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to list all secrets. \n${errMsg}`);
    }
  }

  public async set(
    secrets: Secrets,
    taskId?: string,
    authToken?: string
  ): Promise<void> {
    try {
      const address = await this._signer.getAddress();
      const chainId = await this._signer.getChainId();
      if (!authToken) authToken = await this._signature.getAuthToken();

      const route = taskId
        ? `/users/${address}/secrets/${chainId}/${taskId}`
        : `/users/${address}/secrets`;

      await this._userApi.post(
        route,
        { ...secrets },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to set secrets ${secrets}. \n${errMsg}`);
    }
  }

  public async delete(
    key: string,
    taskId?: string,
    authToken?: string
  ): Promise<void> {
    try {
      const address = await this._signer.getAddress();
      const chainId = await this._signer.getChainId();
      if (!authToken) authToken = await this._signature.getAuthToken();

      const route = taskId
        ? `/users/${address}/secrets/${key}/${chainId}/${taskId}`
        : `/users/${address}/secrets/${key}`;

      await this._userApi.delete(route, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch (err) {
      const errMsg = errorMessage(err);
      throw new Error(`Fail to delete secret "${key}". \n${errMsg}`);
    }
  }
}
