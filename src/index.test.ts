import dotenv from "dotenv";
import { ethers } from "ethers";
import { GelatoOpsSDK } from "./lib";
dotenv.config();

if (!process.env.PK) throw new Error("Missing env PK");
const pk = process.env.PK;
if (!process.env.PROVIDER_URL) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URL;
const chainId = 80001; // mumbai

const iceCreamAddress = "0xa5f9b728ecEB9A1F6FCC89dcc2eFd810bA4Dec41"; // mumbai IceCreamNFT
const iceCreamAbi = ["function lick(uint256) external"];
const iceCreamInterface = new ethers.utils.Interface(iceCreamAbi);

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  const wallet = new ethers.Wallet(pk as string, provider);
  const sdk = new GelatoOpsSDK(chainId, wallet);

  const taskId = await sdk.createTask({
    name: "OpsSdkTest",
    execAddress: iceCreamAddress,
    execSelector: iceCreamInterface.getSighash("lick"),
    execData: iceCreamInterface.encodeFunctionData("lick", [1]),
    dedicatedMsgSender: true,
    singleExec: true,
    startTime: (await provider.getBlock("latest")).timestamp + 300,
  });

  console.log(taskId);
};

main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
