/* eslint-disable @typescript-eslint/naming-convention */
import { GelatoAddressBook } from "../types";

export const AUTOMATE_USER_API = "https://api.gelato.digital/automate/users";
export const AUTOMATE_TASKS_API = "https://api.gelato.digital/automate/tasks";
export const AUTOMATE_USER_DEV_API =
  "https://api.dev.gelato.digital/automate/users";
export const AUTOMATE_TASKS_DEV_API =
  "https://api.dev.gelato.digital/automate/tasks";

export const ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ZERO_ADD = "0x0000000000000000000000000000000000000000";

export const CHAIN_ID = {
  MAINNET: 1,
  GOERLI: 5,
  OPTIMISM: 10,
  CRONOS: 25,
  OPTIMISTIC_GOERLI: 420,
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
  ZKATANA: 1261120,
  SEPOLIA: 11155111,
  UNREAL: 18233,
  OSEPOLIA: 11155420,
  ARBSEPOLIA: 421614,
  GELOPCELESTIATESTNET: 123420111,
  BASESEPOLIA: 84532,
  METIS: 1088,
  LISKSEPOLIA: 4202,
  BLASTSEPOLIA: 168587773,
  MODE: 34443,
  ASTARZKEVM: 3776,
  ASTARZKYOTO: 6038361,
  BLAST: 81457,
  GELATOORBITTESTNET: 88153591557,
  REYACRONOS: 89346162,
  REYA: 1729,
  PLAYBLOCK: 1829,
  BLACKBERRY: 94_204_209,
  AMOY: 80002,
  REAL: 111188,
  CONNEXTSEPOLIA: 6398,
  ANOMALY_ANDROMEDA: 241120,
  ALEPHZEROTESTNET: 2039,
  LISK: 1135,
  COREDAO: 1116,
  ROOTSTOCK: 30,
  NOVASTROTESTNET: 560098,
  OPENCAMPUSCODEX: 656476,
  CAMPNETWORKTESTNET: 325000,
  RIDOTTOTETROMINO: 4444,
  ALEPHZERO: 41455,
  BERACHAINBARTIO: 80084,
  PRISM: 994873017,
  BONITO: 69658185,
  EVERCLEAR: 25327,
  SHAPE: 360,
  FILECOIN: 314,
  STORYTESTNET: 1513,
  POPBERRY: 1233,
  CARVTESTNET: 123420000567,
  INKSEPOLIA: 763373,
  VOLMEX: 123420000588,
  STORY_ODYSSEY_TESTNET: 1516,
  SONIC: 146,
  INK: 57073,
  ABSTRACT: 2741,
  ABCTESTNET: 121,
  BERACHAIN: 80094,
  STORY: 1514,
  MONADTESTNET: 10143,
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
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
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
  [CHAIN_ID.ZKATANA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.SEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.UNREAL]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.OSEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ARBSEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GELOPCELESTIATESTNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BASESEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.METIS]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.LISKSEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BLASTSEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.MODE]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ASTARZKEVM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ASTARZKYOTO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BLAST]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.GELATOORBITTESTNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
    automateDev: "0xd84ED255d7ee2B032f66AeCfB41b51044d409aDC",
  },
  [CHAIN_ID.REYACRONOS]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.REYA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.PLAYBLOCK]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BLACKBERRY]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.AMOY]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
    automateDev: "0xd84ED255d7ee2B032f66AeCfB41b51044d409aDC",
  },
  [CHAIN_ID.REAL]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.CONNEXTSEPOLIA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ANOMALY_ANDROMEDA]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ALEPHZEROTESTNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.LISK]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.COREDAO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ROOTSTOCK]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.NOVASTROTESTNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.OPENCAMPUSCODEX]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.CAMPNETWORKTESTNET]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.RIDOTTOTETROMINO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.ALEPHZERO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BERACHAINBARTIO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.PRISM]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.BONITO]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.EVERCLEAR]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.SHAPE]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.FILECOIN]: {
    automate: "0x2A6C106ae13B558BB9E2Ec64Bd2f1f7BEFF3A5E0",
  },
  [CHAIN_ID.STORYTESTNET]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.POPBERRY]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.CARVTESTNET]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.INKSEPOLIA]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.VOLMEX]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.STORY_ODYSSEY_TESTNET]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.SONIC]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.INK]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.ABSTRACT]: {
    automate: "0xDc04c452547a4B3b81102333f40FD4bF45D355Ce",
  },
  [CHAIN_ID.ABCTESTNET]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.BERACHAIN]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.STORY]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
  [CHAIN_ID.MONADTESTNET]: {
    automate: "0xafd37d0558255aA687167560cd3AaeEa75c2841E",
  },
};
