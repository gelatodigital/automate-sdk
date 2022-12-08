import { Signer } from "@ethersproject/abstract-signer";
import axios, { Axios } from "axios";
import { OPS_USER_API } from "../../constants";
import { errorMessage } from "../../utils";
import { WatchlistData } from "../../types/Watchlist.interface";

class Watchlist {
  private readonly _userApi: Axios;

  constructor() {
    this._userApi = axios.create({
      baseURL: OPS_USER_API,
    });
  }

  public async list(
    signer: Signer,
    authToken: string
  ): Promise<{ data: WatchlistData } | { message: string; status: number }> {
    try {
      const address = await signer.getAddress();

      const response = await this._userApi.get(`/users/${address}/watchlist`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return response as { data: WatchlistData };
    } catch (err) {
      return { message: errorMessage(err), status: err.response.status };
    }
  }

  public async set(
    watchlist: string[],
    signer: Signer,
    authToken: string
  ): Promise<{ data: WatchlistData } | { message: string; status: number }> {
    try {
      const address = await signer.getAddress();

      const response = await this._userApi.post(
        `/users/${address}/watchlist`,
        watchlist,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response as { data: WatchlistData };
    } catch (err) {
      return { message: errorMessage(err), status: err.response.status };
    }
  }
}

export const watchlist = new Watchlist();
