/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const AUTOMATE_USER_API = "https://api.gelato.digital/automate/users";
export const AUTOMATE_TASKS_API = "https://api.gelato.digital/automate/tasks";
export const AUTOMATE_USER_STAGING_API =
  "https://api.staging.gelato.digital/automate/users";
export const AUTOMATE_TASKS_STAGING_API =
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
  POLYGON: 137,
  FANTOM: 250,
  MOONBEAM: 1284,
  MOONRIVER: 1285,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
  MUMBAI: 80001,
  ZKSYNC: 324,
  LINEA: 59144,
  BASE: 8453,
  POLYGONZK: 1101,
};

export const GELATO_ADDRESSES: GelatoAddressBook = {
  [CHAIN_ID.MAINNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.OPTIMISTIC_GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ARBITRUM_GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BASE_GOERLI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.POLYGON]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MUMBAI]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
    automateDev: "0xC97aBa1B6cf4d8aCa19dFba68e99befaDA9aeFE3",
  },
  [CHAIN_ID.FANTOM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ARBITRUM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.AVALANCHE]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BASE]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BSC]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GNOSIS]: {
    automate: "",
  },
  [CHAIN_ID.OPTIMISM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.POLYGONZK]: {
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
  [CHAIN_ID.ZKSYNC]: {
    automate: "0xF27e0dfD58B423b1e1B90a554001d0561917602F",
  },
  [CHAIN_ID.LINEA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
};
