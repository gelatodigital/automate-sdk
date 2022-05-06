# Gelato Ops SDK

Automate your smart contracts using Gelato Ops SDK

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
  const res: TaskReceipt = await gelatoOps.createTask(
    executionAddress, // Address of your smart contract
    executionSelector, // Function Selector to execute on your contract
    resolverAddress, // Use a resolver contract address for dynamic input
    resolverData, // Function Selector to call on your resolver contract
    "New Gelato task"
  );
  console.log(`Task created, taskId: ${res.taskId} (tx hash: ${res.transactionHash})`);
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

