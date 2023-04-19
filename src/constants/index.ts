/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const AUTOMATE_USER_API =
  "https://api.staging.gelato.digital/automate/users";
export const AUTOMATE_TASKS_API =
  "https://api.staging.gelato.digital/automate/tasks";

export const ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADD = "0x0000000000000000000000000000000000000000";

export const CHAIN_ID = {
  MAINNET: 1,
  GOERLI: 5,
  OPTIMISM: 10,
  CRONOS: 25,
  OPTIMISTIC_GOERLI: 420,
  ARBITRUM_GOERLI: 421613,
  BASE_GOERLI: 84531,
  BSC: 56,
  GNOSIS: 100,
  MATIC: 137,
  FANTOM: 250,
  MOONBEAM: 1284,
  MOONRIVER: 1285,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
  MUMBAI: 80001,
  ZKSYNC: 324,
};

export const GELATO_ADDRESSES: GelatoAddressBook = {
  [CHAIN_ID.MAINNET]: {
    automate: "",
  },
  [CHAIN_ID.GOERLI]: {
    automate: "",
  },
  [CHAIN_ID.OPTIMISTIC_GOERLI]: {
    automate: "",
  },
  [CHAIN_ID.ARBITRUM_GOERLI]: {
    automate: "",
  },
  [CHAIN_ID.BASE_GOERLI]: {
    automate: "",
  },
  [CHAIN_ID.MATIC]: {
    automate: "",
  },
  [CHAIN_ID.MUMBAI]: {
    automate: "0xC97aBa1B6cf4d8aCa19dFba68e99befaDA9aeFE3",
  },
  [CHAIN_ID.FANTOM]: {
    automate: "",
  },
  [CHAIN_ID.ARBITRUM]: {
    automate: "",
  },
  [CHAIN_ID.AVALANCHE]: {
    automate: "",
  },
  [CHAIN_ID.BSC]: {
    automate: "",
  },
  [CHAIN_ID.GNOSIS]: {
    automate: "",
  },
  [CHAIN_ID.OPTIMISM]: {
    automate: "",
  },
  [CHAIN_ID.MOONBEAM]: {
    automate: "",
  },
  [CHAIN_ID.MOONRIVER]: {
    automate: "",
  },
  [CHAIN_ID.CRONOS]: {
    automate: "",
  },
  [CHAIN_ID.ZKSYNC]: {
    automate: "0xF27e0dfD58B423b1e1B90a554001d0561917602F",
  },
};
