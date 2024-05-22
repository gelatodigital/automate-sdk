/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface ProxyModuleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "execAddresses"
      | "fee"
      | "feeToken"
      | "onCreateTask"
      | "opsProxyFactory"
      | "postExecCall"
      | "preCancelTask"
      | "preCreateTask"
      | "preExecCall"
      | "taskCreator"
      | "taskModuleAddresses"
      | "timedTask",
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "execAddresses",
    values: [BytesLike],
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onCreateTask",
    values: [BytesLike, AddressLike, AddressLike, BytesLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "opsProxyFactory",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "postExecCall",
    values: [BytesLike, AddressLike, AddressLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "preCancelTask",
    values: [BytesLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "preCreateTask",
    values: [AddressLike, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "preExecCall",
    values: [BytesLike, AddressLike, AddressLike, BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "taskCreator",
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: "taskModuleAddresses",
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "timedTask",
    values: [BytesLike],
  ): string;

  decodeFunctionResult(
    functionFragment: "execAddresses",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onCreateTask",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "opsProxyFactory",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "postExecCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "preCancelTask",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "preCreateTask",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "preExecCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskCreator",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskModuleAddresses",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "timedTask", data: BytesLike): Result;
}

export interface ProxyModule extends BaseContract {
  connect(runner?: ContractRunner | null): ProxyModule;
  waitForDeployment(): Promise<this>;

  interface: ProxyModuleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  execAddresses: TypedContractMethod<[arg0: BytesLike], [string], "view">;

  fee: TypedContractMethod<[], [bigint], "view">;

  feeToken: TypedContractMethod<[], [string], "view">;

  onCreateTask: TypedContractMethod<
    [
      arg0: BytesLike,
      _taskCreator: AddressLike,
      arg2: AddressLike,
      arg3: BytesLike,
      arg4: BytesLike,
    ],
    [void],
    "nonpayable"
  >;

  opsProxyFactory: TypedContractMethod<[], [string], "view">;

  postExecCall: TypedContractMethod<
    [
      taskId: BytesLike,
      taskCreator: AddressLike,
      execAddress: AddressLike,
      execData: BytesLike,
    ],
    [void],
    "nonpayable"
  >;

  preCancelTask: TypedContractMethod<
    [arg0: BytesLike, _taskCreator: AddressLike],
    [string],
    "view"
  >;

  preCreateTask: TypedContractMethod<
    [_taskCreator: AddressLike, _execAddress: AddressLike],
    [[string, string]],
    "view"
  >;

  preExecCall: TypedContractMethod<
    [
      arg0: BytesLike,
      _taskCreator: AddressLike,
      _execAddress: AddressLike,
      _execData: BytesLike,
    ],
    [[string, string] & { execData: string }],
    "view"
  >;

  taskCreator: TypedContractMethod<[arg0: BytesLike], [string], "view">;

  taskModuleAddresses: TypedContractMethod<
    [arg0: BigNumberish],
    [string],
    "view"
  >;

  timedTask: TypedContractMethod<
    [arg0: BytesLike],
    [[bigint, bigint] & { nextExec: bigint; interval: bigint }],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: "execAddresses",
  ): TypedContractMethod<[arg0: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "fee",
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feeToken",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "onCreateTask",
  ): TypedContractMethod<
    [
      arg0: BytesLike,
      _taskCreator: AddressLike,
      arg2: AddressLike,
      arg3: BytesLike,
      arg4: BytesLike,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "opsProxyFactory",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "postExecCall",
  ): TypedContractMethod<
    [
      taskId: BytesLike,
      taskCreator: AddressLike,
      execAddress: AddressLike,
      execData: BytesLike,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "preCancelTask",
  ): TypedContractMethod<
    [arg0: BytesLike, _taskCreator: AddressLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "preCreateTask",
  ): TypedContractMethod<
    [_taskCreator: AddressLike, _execAddress: AddressLike],
    [[string, string]],
    "view"
  >;
  getFunction(
    nameOrSignature: "preExecCall",
  ): TypedContractMethod<
    [
      arg0: BytesLike,
      _taskCreator: AddressLike,
      _execAddress: AddressLike,
      _execData: BytesLike,
    ],
    [[string, string] & { execData: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "taskCreator",
  ): TypedContractMethod<[arg0: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "taskModuleAddresses",
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "timedTask",
  ): TypedContractMethod<
    [arg0: BytesLike],
    [[bigint, bigint] & { nextExec: bigint; interval: bigint }],
    "view"
  >;

  filters: {};
}
