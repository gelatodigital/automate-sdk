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
  execAddress: string;      // address of your smart contract
  execSelector: string;     // function selector to execute on your contract
  execAbi?: string;         // your executor contract ABI 

  // Pre-defined inputs
  execData?: string;        // exec call data 
  
  // Dynamic input (using a resolver)
  resolverAddress?: string; // resolver contract address
  resolverData?: string;    // resolver call data
  resolverAbi?: string;     // your resolver contract ABI

  // Time based task params
  interval?: number;        // execution interval in seconds
  startTime?: number;       // start timestamp in seconds or 0 to start immediately (default: 0)

  // Payment params
  useTreasury?: boolean;    // use false if your task is self-paying (default: true)
}

const params: CreateTaskOptions = { name, execAddress, execSelector, interval };
const res: TaskReceipt = await gelatoOps.createTask(params);
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
const res: TaskReceipt = await gelatoOps.cancelTask(taskId);
console.log(`Task canceled, taskId: ${res.taskId} (tx hash: ${res.transactionHash})`);
```

8. Overriding gas settings:

If you need to override gas settings, you can pass an additional `Overrides` object to `createTask` & `cancelTask` methods:

```typescript
const params: CreateTaskOptions = { name, execAddress, execSelector, interval };
const overrides: Overrides = { gasLimit: 2000000 };
const res: TaskReceipt = await gelatoOps.createTask(params, overrides);
```


## Examples

Check out our tutorial repository [ops-sdk-hello-world](https://github.com/gelatodigital/ops-sdk-hello-world) for more in-depth examples.
