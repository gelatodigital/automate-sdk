# Gelato Automate SDK <!-- omit in toc -->

Automate your smart contracts using Automate SDK

- [Installation](#installation)
- [How to use?](#how-to-use)
- [Examples](#examples)

## Installation

```bash
yarn add @gelatonetwork/automate-sdk
```

or

```bash
npm install @gelatonetwork/automate-sdk
```

## How to use?

1. Import the Automate SDK into your project:

```typescript
import { AutomateSDK } from "@gelatonetwork/automate-sdk";
```

2. Instantiate Automate using the static `create` method with your chain ID and signer:

```typescript
const automate = await AutomateSDK.create(chainId, signer);
```

3. Create an automation task:

```typescript
interface CreateTaskOptions {
  name: string; // your task name

  // Function to execute
  execAddress: string; // address of your target smart contract
  execSelector: string; // function selector to execute on your target smart contract
  execAbi?: string; // ABI of your target smart contract

  // Proxy caller
  dedicatedMsgSender: boolean; // task will be called via a dedicated msg.sender which you can whitelist (recommended: true)

  // Optional: Pre-defined / static target smart contract inputs
  execData?: string; // exec call data

  // Optional: Dynamic target smart contract inputs (using a resolver)
  resolverAddress?: string; // resolver contract address
  resolverData?: string; // resolver call data (encoded data with function selector)
  resolverAbi?: string; // your resolver smart contract ABI

  // Optional: Single execution task
  singleExec?: boolean; // task cancels itself after 1 execution if true.

  // Web3 function params
  web3FunctionHash?: string; // ipfs hash of your web3 function
  web3FunctionArgs?: { [key: string]: unknown }; // web3 function arguments object

  // Optional: Payment params
  useTreasury?: boolean; // use false if your task is self-paying (default: true)

  // Optional: Trigger params, 60s time interval trigger as default if undefined
  trigger?:
    | {
        type: TriggerType.TIME; // time interval trigger
        interval: number; // task interval in ms
        start?: number; // task start timestamp, task will start immediately if undefined or 0
      }
    | {
        type: TriggerType.CRON; // cron trigger
        cron: string; // cron expression
      };
    | {
        type: TriggerType.EVENT; // event trigger
        filter: {
          address: string; // address to listen events for
          topics: Array<Array<string | null>>; // topics to listen for check Ethers.js doc (https://docs.ethers.org/v5/concepts/events/#events--filters)
        };
        blockConfirmations: number; // number of blocks to confirm event before triggering
      };
    |
      {
        type: TriggerType.BLOCK; // block trigger
      };
}

const params: CreateTaskOptions = {
  name,
  execAddress,
  execSelector,
  interval,
  dedicatedMsgSender,
};
const { taskId, tx }: TaskTransaction = await automate.createTask(params);
await tx.wait(); // Optionally wait for tx confirmation
console.log(`Task created, taskId: ${taskId} (tx hash: ${tx.hash})`);
```

4. Retrieve all your tasks:

```typescript
const activeTasks = await automate.getActiveTasks();
activeTasks.forEach((task: Task) => {
  console.log(`- ${task.name} (${task.taskId})`);
});
```

5. Rename a task:

```typescript
await automate.renameTask(taskId, "Another Gelato name");
```

6. Cancel a task:

```typescript
const { taskId, tx }: TaskTransaction = await automate.cancelTask(taskId);
await tx.wait(); // Optionally wait for tx confirmation
console.log(`Task canceled, taskId: ${taskId} (tx hash: ${tx.hash})`);
```

7. Overriding gas settings:

If you need to override gas settings, you can pass an additional `Overrides` object to `createTask` & `cancelTask` methods:

```typescript
const params: CreateTaskOptions = {
  name,
  execAddress,
  execSelector,
  interval,
  dedicatedMsgSender,
};
const overrides: Overrides = { gasLimit: 2000000 };
const tx: TaskTransaction = await automate.createTask(params, overrides);
```

8. Whitelisting msg.sender of function:

If you enabled `dedicatedMsgSender`, your task will be called via a dedicated `msg.sender` which you can whitelist on your smart contract for extra security.

If `dedicatedMsgSender` is set to false, `msg.sender` of the task will be the Automate contract.

To fetch your dedicated `msg.sender`:

```typescript
const { address } = await automate.getDedicatedMsgSender();
console.log("Dedicated msg.sender: ", address);
```

## Examples

Check out our tutorial repository [automate-sdk-hello-world](https://github.com/gelatodigital/automate-sdk-hello-world) for more in-depth examples.
