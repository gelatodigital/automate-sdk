/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const OPS_USER_API = "https://api.gelato.digital/automate/users";
export const OPS_TASKS_API = "https://api.gelato.digital/automate/tasks";

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
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GOERLI]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.OPTIMISTIC_GOERLI]: {
    ops: "",
  },
  [CHAIN_ID.ARBITRUM_GOERLI]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MATIC]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MUMBAI]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.FANTOM]: {
    ops: "",
  },
  [CHAIN_ID.ARBITRUM]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.AVALANCHE]: {
    ops: "",
  },
  [CHAIN_ID.BSC]: {
    ops: "",
  },
  [CHAIN_ID.GNOSIS]: {
    ops: "",
  },
  [CHAIN_ID.OPTIMISM]: {
    ops: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MOONBEAM]: {
    ops: "",
  },
  [CHAIN_ID.MOONRIVER]: {
    ops: "",
  },
  [CHAIN_ID.CRONOS]: {
    ops: "",
  },
};
