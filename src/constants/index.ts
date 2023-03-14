/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const AUTOMATE_USER_API = "https://api.gelato.digital/automate/users";
export const AUTOMATE_TASKS_API = "https://api.gelato.digital/automate/tasks";

export const ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADD = "0x0000000000000000000000000000000000000000";

export const CHAIN_ID = {
  MAINNET: 1,
  GOERLI: 5,
  OPTIMISM: 10,
  CRONOS: 25,
  OPTIMISTIC_GOERLI: 420,
  ARBITRUM_GOERLI: 421613,
  BSC: 56,
  GNOSIS: 100,
  MATIC: 137,
  FANTOM: 250,
  MOONBEAM: 1284,
  MOONRIVER: 1285,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
  MUMBAI: 80001,
};

export const GELATO_ADDRESSES: GelatoAddressBook = {
  [CHAIN_ID.MAINNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.OPTIMISTIC_GOERLI]: {
    automate: "",
  },
  [CHAIN_ID.ARBITRUM_GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MATIC]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MUMBAI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.FANTOM]: {
    automate: "",
  },
  [CHAIN_ID.ARBITRUM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
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
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
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
};
