import dotenv from "dotenv";
import { ethers } from "ethers";
import { AutomateSDK } from "./lib";
import { TriggerType } from "./types";
dotenv.config();

if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URL;
const chainId = 80001; // mumbai

const adBoardAddress = "0x28a0a1c63e7e8f0dae5ad633fe232c12b489d5f0";
const adBoardAbi = ["function postMessage(string)"];

const adBoardInterface = new ethers.utils.Interface(adBoardAbi);

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(pk as string, provider);
  const sdk = new AutomateSDK(chainId, wallet);

  const { taskId, tx } = await sdk.createTask({
    name: "MumbaiDev AdBoard W3F",
    execAddress: adBoardAddress,
    execSelector: adBoardInterface.getSighash("postMessage"),
    dedicatedMsgSender: true,
    singleExec: true,
    trigger: {
      type: TriggerType.TIME,
      start: (await provider.getBlock("latest")).timestamp + 300,
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
