import dotenv from "dotenv";
import { ethers } from "ethers";
import { AutomateSDK } from "./lib";
import { TriggerType } from "./types";
dotenv.config();

if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URL;
const chainId = 421614; // amoy

const counterAutomateAddress = "0xdDF2D006e3010e62c354508D42a2eA5910A88bD2";
const counterAutomateABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CounterIncremented",
    type: "event",
  },
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const counterAutomateInterface = new ethers.Interface(counterAutomateABI);

const main = async () => {
  const provider = new ethers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(pk as string, provider);
  const sdk = new AutomateSDK(chainId, wallet);
  console.log("SDK initialized", sdk);

  const getTimeStampNow = async (): Promise<number> => {
    const blockNumber = await provider.getBlockNumber();
    const block = await provider.getBlock(blockNumber);
    if (!block) throw new Error("Block not found");
    return block.timestamp;
  };

  const { taskId, tx } = await sdk.createTask({
    name: "Test Counter Automate Arbitrum",
    execAddress: counterAutomateAddress,
    execSelector:
      counterAutomateInterface.getFunction("increment")?.selector ?? "",
    dedicatedMsgSender: true,
    singleExec: false,
    trigger: {
      type: TriggerType.TIME,
      start: (await getTimeStampNow()) + 300,
      interval: 60 * 1000,
    },
  });

  console.log("TaskId:", taskId);
  await tx.wait();
  console.log("Transaction hash", tx.hash);
};
main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
