import dotenv from "dotenv";
import { ethers } from "ethers";
import { AutomateSDK } from "./lib";
import { TriggerType } from "./types";
dotenv.config();

if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URL;
const chainId = 80002; // amoy

const counterAddress = "0xEEeBe2F778AA186e88dCf2FEb8f8231565769C27"; // amoy Counter Contract
const counterAbi = ["function increment() external"];
const counterInterface = new ethers.utils.Interface(counterAbi);

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(pk as string, provider);
  const sdk = await AutomateSDK.create(chainId, wallet);

  const { taskId, tx } = await sdk.createTask(
    {
      name: "AutomateSdkTest",
      execAddress: counterAddress,
      execSelector: counterInterface.getSighash("increment"),
      execData: counterInterface.encodeFunctionData("increment"),
      dedicatedMsgSender: true,
      singleExec: true,
      trigger: {
        type: TriggerType.TIME,
        start: (await provider.getBlock("latest")).timestamp + 300,
        interval: 60 * 1000,
      },
    },
    {
      gasPrice: ethers.utils.parseUnits("60", "gwei"),
    },
  );

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
