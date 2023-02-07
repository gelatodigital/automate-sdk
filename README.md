# Gelato Ops SDK <!-- omit in toc -->

Automate your smart contracts using Gelato Ops SDK

- [Installation](#installation)
- [How to use?](#how-to-use)
- [Examples](#examples)

## Installation

```bash
yarn add @gelatonetwork/ops-sdk
```
or
```bash
npm install @gelatonetwork/ops-sdk
```

## How to use?

1. Import the Gelato Ops SDK into your project:

```typescript
import { GelatoOpsSDK } from "@gelatonetwork/ops-sdk";
```

2. Check if Gelato Ops is deployed on your network:

```typescript
  import { isGelatoOpsSupported } from "@gelatonetwork/ops-sdk";

  if (!isGelatoOpsSupported(chainId)) {
    console.log(`Gelato Ops network not supported (${chainId})`);
    return;
  }
```

3. Instantiate Gelato Ops using your signer:

```typescript
const gelatoOps = new GelatoOpsSDK(chainId, signer);
```

4. Create an automation task:

```typescript
interface CreateTaskOptions {
  name: string;             // your task name

  // Function to execute
  execAddress: string;      // address of your target smart contract
  execSelector: string;     // function selector to execute on your target smart contract
  execAbi?: string;         // ABI of your target smart contract
  
  // Proxy caller
  dedicatedMsgSender: boolean;     // task will be called via a dedicated msg.sender which you can whitelist (recommended: true)

  // Optional: Pre-defined / static target smart contract inputs
  execData?: string;        // exec call data 
  
  // Optional: Dynamic target smart contract inputs (using a resolver)
  resolverAddress?: string; // resolver contract address
  resolverData?: string;    // resolver call data (encoded data with function selector)
  resolverAbi?: string;     // your resolver smart contract ABI

  // Optional: Time based task params
  interval?: number;        // execution interval in seconds
  startTime?: number;       // start timestamp in seconds or 0 to start immediately (default: 0)

  // Optional: Single execution task
  singleExec?: boolean;     // task cancels itself after 1 execution if true.

  // Web3 function params
  web3FunctionHash?: string;    // ipfs hash of your web3 function
  web3FunctionArgs?: 
  {[key: string]: unknown}; // web3 function arguments object

  // Optional: Payment params
  useTreasury?: boolean;    // use false if your task is self-paying (default: true)
}

const params: CreateTaskOptions = { name, execAddress, execSelector, interval, dedicatedMsgSender };
const { taskId, tx }: TaskTransaction = await gelatoOps.createTask(params);
await tx.wait(); // Optionally wait for tx confirmation
console.log(`Task created, taskId: ${taskId} (tx hash: ${tx.hash})`);
```

5. Retrieve all your tasks:

```typescript
  const activeTasks = await gelatoOps.getActiveTasks();
  activeTasks.forEach((task: Task) => {
    console.log(`- ${task.name} (${task.taskId})`);
  });
```

6. Rename a task:

```typescript
await gelatoOps.renameTask(taskId, "Another Gelato name");
```

7. Cancel a task:

```typescript
const { taskId, tx }: TaskTransaction = await gelatoOps.cancelTask(taskId);
await tx.wait(); // Optionally wait for tx confirmation
console.log(`Task canceled, taskId: ${taskId} (tx hash: ${tx.hash})`);
```

8. Overriding gas settings:

If you need to override gas settings, you can pass an additional `Overrides` object to `createTask` & `cancelTask` methods:

```typescript
const params: CreateTaskOptions = { name, execAddress, execSelector, interval, dedicatedMsgSender };
const overrides: Overrides = { gasLimit: 2000000 };
const tx: TaskTransaction = await gelatoOps.createTask(params, overrides);
```

9. Whitelisting msg.sender of function:

If you enabled `dedicatedMsgSender`, your task will be called via a dedicated `msg.sender` which you can whitelist on your smart contract for extra security.

If `dedicatedMsgSender` is set to false, `msg.sender` of the task will be the Ops contract.

To fetch your dedicated `msg.sender`:

```typescript
const { address } = await gelatoOps.getDedicatedMsgSender();
console.log("Dedicated msg.sender: ", address);
```


## Examples

Check out our tutorial repository [ops-sdk-hello-world](https://github.com/gelatodigital/ops-sdk-hello-world) for more in-depth examples.
