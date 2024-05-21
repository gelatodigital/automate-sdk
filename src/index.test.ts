import dotenv from "dotenv";
import { ethers } from "ethers";
import { AutomateSDK } from "./lib";
import { TriggerType } from "./types";
// import { time } from "@nomicfoundation/hardhat-network-helpers";
dotenv.config();

if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl =
  "https://polygon-amoy.g.alchemy.com/v2/vZz5_SsX5KlM3h5PffzhM5jQLMuGCBbl";
// const providerUrl = process.env.PROVIDER_URL;
const chainId = 80002; // amoy

const iceCreamAddress = "0xa5f9b728ecEB9A1F6FCC89dcc2eFd810bA4Dec41"; // mumbai IceCreamNFT
const iceCreamAbi = ["function lick(uint256) external"];
const iceCreamInterface = new ethers.Interface(iceCreamAbi);

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
    name: "AutomateSdkTest",
    execAddress: iceCreamAddress,
    execSelector: iceCreamInterface.getFunction("lick")?.selector ?? "",
    execData: iceCreamInterface.encodeFunctionData("lick", [2]),
    dedicatedMsgSender: true,
    singleExec: true,
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
