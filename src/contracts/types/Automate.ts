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

export declare namespace LibDataTypes {
  export type ModuleDataStruct = { modules: BigNumberish[]; args: BytesLike[] };

  export type ModuleDataStructOutput = [modules: bigint[], args: string[]] & {
    modules: bigint[];
    args: string[];
  };
}

export interface AutomateInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "cancelTask"
      | "createTask"
      | "exec"
      | "execAddresses"
      | "fee"
      | "feeToken"
      | "gelato"
      | "getFeeDetails"
      | "getTaskIdsByUser"
      | "setModule"
      | "taskCreator"
      | "taskModuleAddresses"
      | "taskTreasury"
      | "timedTask"
      | "version"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelTask",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createTask",
    values: [AddressLike, BytesLike, LibDataTypes.ModuleDataStruct, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "exec",
    values: [
      AddressLike,
      AddressLike,
      BytesLike,
      LibDataTypes.ModuleDataStruct,
      BigNumberish,
      AddressLike,
      boolean,
      boolean
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execAddresses",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "gelato", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getFeeDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTaskIdsByUser",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setModule",
    values: [BigNumberish[], AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "taskCreator",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "taskModuleAddresses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "taskTreasury",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timedTask",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "cancelTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "exec", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "execAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gelato", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFeeDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTaskIdsByUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setModule", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "taskCreator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskModuleAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "taskTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "timedTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export interface Automate extends BaseContract {
  connect(runner?: ContractRunner | null): Automate;
  waitForDeployment(): Promise<this>;

  interface: AutomateInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  cancelTask: TypedContractMethod<[_taskId: BytesLike], [void], "nonpayable">;

  createTask: TypedContractMethod<
    [
      _execAddress: AddressLike,
      _execDataOrSelector: BytesLike,
      _moduleData: LibDataTypes.ModuleDataStruct,
      _feeToken: AddressLike
    ],
    [string],
    "nonpayable"
  >;

  exec: TypedContractMethod<
    [
      _taskCreator: AddressLike,
      _execAddress: AddressLike,
      _execData: BytesLike,
      _moduleData: LibDataTypes.ModuleDataStruct,
      _txFee: BigNumberish,
      _feeToken: AddressLike,
      _useTaskTreasuryFunds: boolean,
      _revertOnFailure: boolean
    ],
    [void],
    "nonpayable"
  >;

  execAddresses: TypedContractMethod<[arg0: BytesLike], [string], "view">;

  fee: TypedContractMethod<[], [bigint], "view">;

  feeToken: TypedContractMethod<[], [string], "view">;

  gelato: TypedContractMethod<[], [string], "view">;

  getFeeDetails: TypedContractMethod<[], [[bigint, string]], "view">;

  getTaskIdsByUser: TypedContractMethod<
    [_taskCreator: AddressLike],
    [string[]],
    "view"
  >;

  setModule: TypedContractMethod<
    [_modules: BigNumberish[], _moduleAddresses: AddressLike[]],
    [void],
    "nonpayable"
  >;

  taskCreator: TypedContractMethod<[arg0: BytesLike], [string], "view">;

  taskModuleAddresses: TypedContractMethod<
    [arg0: BigNumberish],
    [string],
    "view"
  >;

  taskTreasury: TypedContractMethod<[], [string], "view">;

  timedTask: TypedContractMethod<
    [arg0: BytesLike],
    [[bigint, bigint] & { nextExec: bigint; interval: bigint }],
    "view"
  >;

  version: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "cancelTask"
  ): TypedContractMethod<[_taskId: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createTask"
  ): TypedContractMethod<
    [
      _execAddress: AddressLike,
      _execDataOrSelector: BytesLike,
      _moduleData: LibDataTypes.ModuleDataStruct,
      _feeToken: AddressLike
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "exec"
  ): TypedContractMethod<
    [
      _taskCreator: AddressLike,
      _execAddress: AddressLike,
      _execData: BytesLike,
      _moduleData: LibDataTypes.ModuleDataStruct,
      _txFee: BigNumberish,
      _feeToken: AddressLike,
      _useTaskTreasuryFunds: boolean,
      _revertOnFailure: boolean
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "execAddresses"
  ): TypedContractMethod<[arg0: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "fee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feeToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "gelato"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getFeeDetails"
  ): TypedContractMethod<[], [[bigint, string]], "view">;
  getFunction(
    nameOrSignature: "getTaskIdsByUser"
  ): TypedContractMethod<[_taskCreator: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "setModule"
  ): TypedContractMethod<
    [_modules: BigNumberish[], _moduleAddresses: AddressLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "taskCreator"
  ): TypedContractMethod<[arg0: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "taskModuleAddresses"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "taskTreasury"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "timedTask"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [[bigint, bigint] & { nextExec: bigint; interval: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
