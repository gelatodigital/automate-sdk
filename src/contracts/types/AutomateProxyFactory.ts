/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface AutomateProxyFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deploy"
      | "deployFor"
      | "determineProxyAddress"
      | "getNextSeed"
      | "getOwnerOf"
      | "getProxyOf"
      | "implementation"
      | "isProxy"
      | "ops"
      | "version",
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "DeployProxy"): EventFragment;

  encodeFunctionData(functionFragment: "deploy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deployFor",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "determineProxyAddress",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getNextSeed",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getOwnerOf",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "getProxyOf",
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "isProxy",
    values: [AddressLike],
  ): string;
  encodeFunctionData(functionFragment: "ops", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deployFor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "determineProxyAddress",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNextSeed",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "getOwnerOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getProxyOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "isProxy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export namespace DeployProxyEvent {
  export type InputTuple = [
    deployer: AddressLike,
    owner: AddressLike,
    seed: BytesLike,
    salt: BytesLike,
    proxy: AddressLike,
  ];
  export type OutputTuple = [
    deployer: string,
    owner: string,
    seed: string,
    salt: string,
    proxy: string,
  ];
  export interface OutputObject {
    deployer: string;
    owner: string;
    seed: string;
    salt: string;
    proxy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AutomateProxyFactory extends BaseContract {
  connect(runner?: ContractRunner | null): AutomateProxyFactory;
  waitForDeployment(): Promise<this>;

  interface: AutomateProxyFactoryInterface;

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

  deploy: TypedContractMethod<[], [string], "nonpayable">;

  deployFor: TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;

  determineProxyAddress: TypedContractMethod<
    [_account: AddressLike],
    [string],
    "view"
  >;

  getNextSeed: TypedContractMethod<[_account: AddressLike], [string], "view">;

  getOwnerOf: TypedContractMethod<[_proxy: AddressLike], [string], "view">;

  getProxyOf: TypedContractMethod<
    [_account: AddressLike],
    [[string, boolean]],
    "view"
  >;

  implementation: TypedContractMethod<[], [string], "view">;

  isProxy: TypedContractMethod<[proxy: AddressLike], [boolean], "view">;

  ops: TypedContractMethod<[], [string], "view">;

  version: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: "deploy",
  ): TypedContractMethod<[], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "deployFor",
  ): TypedContractMethod<[owner: AddressLike], [string], "nonpayable">;
  getFunction(
    nameOrSignature: "determineProxyAddress",
  ): TypedContractMethod<[_account: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getNextSeed",
  ): TypedContractMethod<[_account: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getOwnerOf",
  ): TypedContractMethod<[_proxy: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getProxyOf",
  ): TypedContractMethod<[_account: AddressLike], [[string, boolean]], "view">;
  getFunction(
    nameOrSignature: "implementation",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isProxy",
  ): TypedContractMethod<[proxy: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "ops",
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "version",
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "DeployProxy",
  ): TypedContractEvent<
    DeployProxyEvent.InputTuple,
    DeployProxyEvent.OutputTuple,
    DeployProxyEvent.OutputObject
  >;

  filters: {
    "DeployProxy(address,address,bytes32,bytes32,address)": TypedContractEvent<
      DeployProxyEvent.InputTuple,
      DeployProxyEvent.OutputTuple,
      DeployProxyEvent.OutputObject
    >;
    DeployProxy: TypedContractEvent<
      DeployProxyEvent.InputTuple,
      DeployProxyEvent.OutputTuple,
      DeployProxyEvent.OutputObject
    >;
  };
}
