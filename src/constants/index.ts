/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const OPS_TASKS_API =
  "https://ops-task.fra.gelato.digital/1514007e8336fa99e6fe/api";

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
    ops: "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F",
  },
  [CHAIN_ID.GOERLI]: {
    ops: "0xc1C6805B857Bef1f412519C4A842522431aFed39",
  },
  [CHAIN_ID.OPTIMISTIC_GOERLI]: {
    ops: "0x255F82563b5973264e89526345EcEa766DB3baB2",
  },
  [CHAIN_ID.ARBITRUM_GOERLI]: {
    ops: "0xa5f9b728ecEB9A1F6FCC89dcc2eFd810bA4Dec41",
  },
  [CHAIN_ID.MATIC]: {
    ops: "0x527a819db1eb0e34426297b03bae11F2f8B3A19E",
  },
  [CHAIN_ID.MUMBAI]: {
    ops: "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F",
  },
  [CHAIN_ID.FANTOM]: {
    ops: "0x6EDe1597c05A0ca77031cBA43Ab887ccf24cd7e8",
  },
  [CHAIN_ID.ARBITRUM]: {
    ops: "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F",
  },
  [CHAIN_ID.AVALANCHE]: {
    ops: "0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB",
  },
  [CHAIN_ID.BSC]: {
    ops: "0x527a819db1eb0e34426297b03bae11F2f8B3A19E",
  },
  [CHAIN_ID.GNOSIS]: {
    ops: "0x8aB6aDbC1fec4F18617C9B889F5cE7F28401B8dB",
  },
  [CHAIN_ID.OPTIMISM]: {
    ops: "0x340759c8346A1E6Ed92035FB8B6ec57cE1D82c2c",
  },
  [CHAIN_ID.MOONBEAM]: {
    ops: "0x6c3224f9b3feE000A444681d5D45e4532D5BA531",
  },
  [CHAIN_ID.MOONRIVER]: {
    ops: "0x86B7e611194978F556007ac1F52D09d114D8f160",
  },
  [CHAIN_ID.CRONOS]: {
    ops: "0x86B7e611194978F556007ac1F52D09d114D8f160",
  },
};

export const AUTH_DEFAULTS = {
  statement: "Sign this message to authenticate",
  domain: "app.gelato.network",
  uri: "http://beta.app.gelato.network",
  expirationTimestamp: 600_000,
  chainId: 1,
  version: "1",
};
