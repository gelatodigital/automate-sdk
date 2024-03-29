/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface AutomateProxyInterface extends utils.Interface {
  functions: {
    "batchExecuteCall(address[],bytes[],uint256[])": FunctionFragment;
    "executeCall(address,bytes,uint256)": FunctionFragment;
    "ops()": FunctionFragment;
    "owner()": FunctionFragment;
    "version()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "batchExecuteCall"
      | "executeCall"
      | "ops"
      | "owner"
      | "version",
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "batchExecuteCall",
    values: [string[], BytesLike[], BigNumberish[]],
  ): string;
  encodeFunctionData(
    functionFragment: "executeCall",
    values: [string, BytesLike, BigNumberish],
  ): string;
  encodeFunctionData(functionFragment: "ops", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "batchExecuteCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeCall",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "ops", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;

  events: {
    "ExecuteCall(address,bytes,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExecuteCall"): EventFragment;
}

export interface ExecuteCallEventObject {
  target: string;
  data: string;
  value: BigNumber;
  returnData: string;
}
export type ExecuteCallEvent = TypedEvent<
  [string, string, BigNumber, string],
  ExecuteCallEventObject
>;

export type ExecuteCallEventFilter = TypedEventFilter<ExecuteCallEvent>;

export interface AutomateProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AutomateProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    batchExecuteCall(
      _targets: string[],
      _datas: BytesLike[],
      _values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string },
    ): Promise<ContractTransaction>;

    executeCall(
      _target: string,
      _data: BytesLike,
      _value: BigNumberish,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<ContractTransaction>;

    ops(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    version(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  batchExecuteCall(
    _targets: string[],
    _datas: BytesLike[],
    _values: BigNumberish[],
    overrides?: PayableOverrides & { from?: string },
  ): Promise<ContractTransaction>;

  executeCall(
    _target: string,
    _data: BytesLike,
    _value: BigNumberish,
    overrides?: PayableOverrides & { from?: string },
  ): Promise<ContractTransaction>;

  ops(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  version(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    batchExecuteCall(
      _targets: string[],
      _datas: BytesLike[],
      _values: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<void>;

    executeCall(
      _target: string,
      _data: BytesLike,
      _value: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>;

    ops(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "ExecuteCall(address,bytes,uint256,bytes)"(
      target?: string | null,
      data?: null,
      value?: null,
      returnData?: null,
    ): ExecuteCallEventFilter;
    ExecuteCall(
      target?: string | null,
      data?: null,
      value?: null,
      returnData?: null,
    ): ExecuteCallEventFilter;
  };

  estimateGas: {
    batchExecuteCall(
      _targets: string[],
      _datas: BytesLike[],
      _values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string },
    ): Promise<BigNumber>;

    executeCall(
      _target: string,
      _data: BytesLike,
      _value: BigNumberish,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<BigNumber>;

    ops(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    batchExecuteCall(
      _targets: string[],
      _datas: BytesLike[],
      _values: BigNumberish[],
      overrides?: PayableOverrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    executeCall(
      _target: string,
      _data: BytesLike,
      _value: BigNumberish,
      overrides?: PayableOverrides & { from?: string },
    ): Promise<PopulatedTransaction>;

    ops(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
