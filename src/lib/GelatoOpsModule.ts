/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty */
import { encode, decode } from "@msgpack/msgpack";
import { ethers } from "ethers";
import {
  Module,
  ModuleArgsParams,
  ModuleData,
  OffChainResolverParams,
  ResolverParams,
  TimeParams,
} from "../types/Module.interface";

export class GelatoOpsModule {
  public encodeModuleArgs = (
    moduleArgsParams: Partial<ModuleArgsParams>
  ): ModuleData => {
    const modules: Module[] = [];
    const args: string[] = [];

    const {
      resolverAddress,
      resolverData,
      startTime,
      interval,
      proxy,
      singleExec,
      offChainResolverHash,
      offChainResolverArgs,
    } = moduleArgsParams;

    if (resolverAddress && resolverData) {
      modules.push(Module.RESOLVER);
      args.push(this._encodeResolverArgs(resolverAddress, resolverData));
    }

    if (interval) {
      const start = startTime ?? 0;
      modules.push(Module.TIME);
      args.push(this._encodeTimeArgs(start, interval));
    }

    if (proxy) {
      modules.push(Module.PROXY);
      args.push("0x");
    }

    if (singleExec) {
      modules.push(Module.SINGLE_EXEC);
      args.push("0x");
    }

    if (offChainResolverHash && offChainResolverArgs) {
      modules.push(Module.ORESOLVER);
      args.push(
        this._encodeOResolverArgs(offChainResolverHash, offChainResolverArgs)
      );
    }

    return { modules, args };
  };

  public decodeModuleArgs = (moduleData: ModuleData): ModuleArgsParams => {
    const modules = moduleData.modules;
    const args = moduleData.args;

    const moduleArgsDecoded: ModuleArgsParams = {
      resolverAddress: null,
      resolverData: null,
      startTime: null,
      interval: null,
      dedicatedMsgSender: false,
      singleExec: false,
      offChainResolverHash: null,
      offChainResolverArgs: {},
    };

    if (modules.includes(Module.RESOLVER)) {
      const indexOfModule = modules.indexOf(Module.RESOLVER);
      const { resolverAddress, resolverData } = this._decodeResolverArgs(
        args[indexOfModule]
      );

      moduleArgsDecoded.resolverAddress = resolverAddress;
      moduleArgsDecoded.resolverData = resolverData;
    }

    if (modules.includes(Module.TIME)) {
      const indexOfModule = modules.indexOf(Module.TIME);
      const { startTime, interval } = this._decodeTimeArgs(args[indexOfModule]);

      moduleArgsDecoded.startTime = startTime;
      moduleArgsDecoded.interval = interval;
    }

    if (modules.includes(Module.PROXY)) {
      moduleArgsDecoded.dedicatedMsgSender = true;
    }

    if (modules.includes(Module.SINGLE_EXEC)) {
      moduleArgsDecoded.singleExec = true;
    }

    if (modules.includes(Module.ORESOLVER)) {
      const indexOfModule = modules.indexOf(Module.ORESOLVER);
      const { offChainResolverHash, offChainResolverArgs } =
        this._decodeOResolverArgs(args[indexOfModule]);

      moduleArgsDecoded.offChainResolverHash = offChainResolverHash;
      moduleArgsDecoded.offChainResolverArgs = offChainResolverArgs;
    }

    return moduleArgsDecoded;
  };

  private _encodeResolverArgs = (
    resolverAddress: string,
    resolverData: string
  ): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["address", "bytes"],
      [resolverAddress, resolverData]
    );

    return encoded;
  };

  private _decodeResolverArgs = (encodedModuleArgs: string): ResolverParams => {
    let resolverAddress: string | null = null;
    let resolverData: string | null = null;

    try {
      [resolverAddress, resolverData] = ethers.utils.defaultAbiCoder.decode(
        ["address", "bytes"],
        encodedModuleArgs
      );
    } catch {}

    return { resolverAddress, resolverData };
  };

  private _encodeTimeArgs = (startTime: number, interval: number): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["uint128", "uint128"],
      [startTime, interval]
    );

    return encoded;
  };

  private _decodeTimeArgs = (encodedModuleArgs: string): TimeParams => {
    let startTime: number | null = null;
    let interval: number | null = null;

    try {
      [startTime, interval] = ethers.utils.defaultAbiCoder.decode(
        ["uint128", "uint128"],
        encodedModuleArgs
      );
    } catch {}

    return { startTime, interval };
  };

  private _encodeOResolverArgs = (
    oResolverHash: string,
    oResolverArgs: { [key: string]: unknown }
  ): string => {
    const oResolverArgsBuffer = encode(oResolverArgs);
    const oResolverArgsHex = this._bufferToHex(oResolverArgsBuffer);
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["string", "bytes"],
      [oResolverHash, oResolverArgsHex]
    );

    return encoded;
  };

  private _decodeOResolverArgs = (
    encodedModuleArgs: string
  ): OffChainResolverParams => {
    let oResolverHash: string | null = null;
    let oResolverArgs: { [key: string]: unknown } | null = null;

    try {
      let oResolverArgsHex: string;
      [oResolverHash, oResolverArgsHex] = ethers.utils.defaultAbiCoder.decode(
        ["string", "bytes"],
        encodedModuleArgs
      );

      const oResolverArgsBuffer = this._hexToBuffer(oResolverArgsHex);
      oResolverArgs = decode(oResolverArgsBuffer) as { [key: string]: unknown };
    } catch {}

    return {
      offChainResolverHash: oResolverHash,
      offChainResolverArgs: oResolverArgs,
    };
  };

  private _hexToBuffer = (hexString: string): Uint8Array => {
    const noPrefix = hexString.slice(2);
    const buffer = Uint8Array.from(Buffer.from(noPrefix, "hex"));
    return buffer;
  };

  private _bufferToHex = (buffer: Uint8Array): string => {
    const hex = [...new Uint8Array(buffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const hexPrefixed = "0x" + hex;
    return hexPrefixed;
  };
}
