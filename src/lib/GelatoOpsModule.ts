/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty */
import { encode, decode } from "@msgpack/msgpack";
import { ethers } from "ethers";
import {
  Web3FunctionParams,
  Web3FunctionUserArgs,
  Web3FunctionUserArgsSchema,
  Module,
  ModuleArgsParams,
  ModuleData,
  OffChainResolverParams,
  ResolverParams,
  TimeParams,
} from "../types";
import { Web3FunctionDownloader } from "./Web3Function/Web3FunctionDownloader";

export class GelatoOpsModule {
  public encodeModuleArgs = async (
    moduleArgsParams: Partial<ModuleArgsParams>
  ): Promise<ModuleData> => {
    const modules: Module[] = [];
    const args: string[] = [];

    const {
      resolverAddress,
      resolverData,
      startTime,
      interval,
      dedicatedMsgSender,
      singleExec,
      offChainResolverHash,
      offChainResolverArgs,
      web3FunctionHash,
      web3FunctionArgs,
      web3FunctionArgsHex,
    } = moduleArgsParams;

    if (resolverAddress && resolverData) {
      modules.push(Module.RESOLVER);
      args.push(this.encodeResolverArgs(resolverAddress, resolverData));
    }

    if (interval) {
      const start = startTime ?? 0;
      modules.push(Module.TIME);
      args.push(this.encodeTimeArgs(start, interval));
    }

    if (dedicatedMsgSender) {
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
        this.encodeOResolverArgs(offChainResolverHash, offChainResolverArgs)
      );
    }

    if (web3FunctionHash && web3FunctionArgsHex) {
      modules.push(Module.WEB3_FUNCTION);
      args.push(
        await this.encodeWeb3FunctionArgs(
          web3FunctionHash,
          undefined,
          web3FunctionArgsHex
        )
      );
    } else if (web3FunctionHash && web3FunctionArgs) {
      modules.push(Module.WEB3_FUNCTION);
      args.push(
        await this.encodeWeb3FunctionArgs(web3FunctionHash, web3FunctionArgs)
      );
    }

    return { modules, args };
  };

  public decodeModuleArgs = async (
    moduleData: ModuleData
  ): Promise<ModuleArgsParams> => {
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
      offChainResolverArgs: null,
      offChainResolverArgsHex: null,
      web3FunctionHash: null,
      web3FunctionArgs: null,
      web3FunctionArgsHex: null,
    };

    if (modules.includes(Module.RESOLVER)) {
      const indexOfModule = modules.indexOf(Module.RESOLVER);
      const { resolverAddress, resolverData } = this.decodeResolverArgs(
        args[indexOfModule]
      );

      moduleArgsDecoded.resolverAddress = resolverAddress;
      moduleArgsDecoded.resolverData = resolverData;
    }

    if (modules.includes(Module.TIME)) {
      const indexOfModule = modules.indexOf(Module.TIME);
      const { startTime, interval } = this.decodeTimeArgs(args[indexOfModule]);

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
      const {
        offChainResolverHash,
        offChainResolverArgs,
        offChainResolverArgsHex,
      } = this.decodeOResolverArgs(args[indexOfModule]);

      moduleArgsDecoded.offChainResolverHash = offChainResolverHash;
      moduleArgsDecoded.offChainResolverArgs = offChainResolverArgs;
      moduleArgsDecoded.offChainResolverArgsHex = offChainResolverArgsHex;
    }

    if (modules.includes(Module.WEB3_FUNCTION)) {
      const indexOfModule = modules.indexOf(Module.WEB3_FUNCTION);

      const { web3FunctionHash, web3FunctionArgs, web3FunctionArgsHex } =
        await this.decodeWeb3FunctionArgs(args[indexOfModule]);

      moduleArgsDecoded.web3FunctionHash = web3FunctionHash;
      moduleArgsDecoded.web3FunctionArgs = web3FunctionArgs;
      moduleArgsDecoded.web3FunctionArgsHex = web3FunctionArgsHex;
    }

    return moduleArgsDecoded;
  };

  public encodeResolverArgs = (
    resolverAddress: string,
    resolverData: string
  ): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["address", "bytes"],
      [resolverAddress, resolverData]
    );

    return encoded;
  };

  public decodeResolverArgs = (encodedModuleArgs: string): ResolverParams => {
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

  public encodeTimeArgs = (startTime: number, interval: number): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["uint128", "uint128"],
      [startTime, interval]
    );

    return encoded;
  };

  public decodeTimeArgs = (encodedModuleArgs: string): TimeParams => {
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

  public encodeOResolverArgs = (
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

  public decodeOResolverArgs = (
    encodedModuleArgs: string
  ): OffChainResolverParams => {
    let oResolverHash: string | null = null;
    let oResolverArgs: { [key: string]: unknown } | null = null;
    let oResolverArgsHex: string | null = null;

    try {
      [oResolverHash, oResolverArgsHex] = ethers.utils.defaultAbiCoder.decode(
        ["string", "bytes"],
        encodedModuleArgs
      );

      const oResolverArgsBuffer = this._hexToBuffer(oResolverArgsHex as string);
      oResolverArgs = decode(oResolverArgsBuffer) as { [key: string]: unknown };
    } catch {}

    return {
      offChainResolverHash: oResolverHash,
      offChainResolverArgs: oResolverArgs,
      offChainResolverArgsHex: oResolverArgsHex,
    };
  };

  public encodeWeb3FunctionArgs = async (
    web3FunctionHash: string,
    web3FunctionArgs?: Web3FunctionUserArgs,
    web3FunctionArgsHex?: string
  ): Promise<string> => {
    try {
      if (!web3FunctionArgsHex && web3FunctionArgs) {
        const { types, keys } = await this.getAbiTypesAndKeysFromSchema(
          web3FunctionHash
        );
        // ensure all userArgs are provided & encoded in same order as they are defined in the schema
        const values: (
          | string
          | boolean
          | number
          | string[]
          | boolean[]
          | number[]
        )[] = [];
        for (const key of keys) {
          if (typeof web3FunctionArgs[key] === "undefined") {
            throw new Error(
              `Missing user arg '${key}' defined in resolver schema`
            );
          }
          values.push(web3FunctionArgs[key]);
        }

        web3FunctionArgsHex = ethers.utils.defaultAbiCoder.encode(
          types,
          values
        );
      }

      const encoded = ethers.utils.defaultAbiCoder.encode(
        ["string", "bytes"],
        [web3FunctionHash, web3FunctionArgsHex]
      );

      return encoded;
    } catch (err) {
      throw new Error(`Fail to encode Web3Function: ${err.message}`);
    }
  };

  public decodeWeb3FunctionArgs = async (
    encodedModuleArgs: string
  ): Promise<Web3FunctionParams> => {
    let web3FunctionHash: string | null = null;
    let web3FunctionArgs: Web3FunctionUserArgs | null = null;
    let web3FunctionArgsHex: string | null = null;

    try {
      [web3FunctionHash, web3FunctionArgsHex] =
        ethers.utils.defaultAbiCoder.decode(
          ["string", "bytes"],
          encodedModuleArgs
        );

      web3FunctionArgs = await this.decodeWeb3FunctionArgsHex(
        web3FunctionArgsHex as string,
        {
          web3FunctionHash: web3FunctionHash as string,
        }
      );
    } catch (err) {
      console.error(`Fail to decode Web3FunctionArgs: ${err.message}`);
    }

    return { web3FunctionHash, web3FunctionArgs, web3FunctionArgsHex };
  };

  public decodeWeb3FunctionArgsHex = async (
    web3FunctionArgsHex: string,
    schema: {
      web3FunctionHash?: string;
      userArgsSchema?: Web3FunctionUserArgsSchema;
    }
  ): Promise<Web3FunctionUserArgs | null> => {
    try {
      let schemaAbi: { types: string[]; keys: string[] };
      const web3FunctionArgs: Web3FunctionUserArgs = {};
      if (schema.web3FunctionHash)
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          schema.web3FunctionHash
        );
      else
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          undefined,
          schema.userArgsSchema
        );

      const { types, keys } = schemaAbi;
      const web3FunctionArgsValues = ethers.utils.defaultAbiCoder.decode(
        types,
        web3FunctionArgsHex as string
      ) as never[];
      // decode argument according to schema key order
      keys.forEach(
        (key, idx) => (web3FunctionArgs[key] = web3FunctionArgsValues[idx])
      );

      return web3FunctionArgs;
    } catch (err) {
      console.error(`Fail to decode Web3FunctionArgsHex: ${err.message}`);
      return null;
    }
  };

  public _hexToBuffer = (hexString: string): Uint8Array => {
    const noPrefix = hexString.slice(2);
    const buffer = Uint8Array.from(Buffer.from(noPrefix, "hex"));
    return buffer;
  };

  public _bufferToHex = (buffer: Uint8Array): string => {
    const hex = [...new Uint8Array(buffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const hexPrefixed = "0x" + hex;
    return hexPrefixed;
  };

  private getAbiTypesAndKeysFromSchema = async (
    web3FunctionHash?: string,
    _userArgsSchema?: Web3FunctionUserArgsSchema
  ): Promise<{ keys: string[]; types: string[] }> => {
    try {
      let userArgsSchema = _userArgsSchema;

      if (!userArgsSchema) {
        if (web3FunctionHash) {
          const downloader = new Web3FunctionDownloader();
          const schema = await downloader.fetchSchema(web3FunctionHash);
          userArgsSchema = schema.userArgs;
        } else
          throw new Error(`Both userArgsSchema && web3FunctionHash undefined`);
      }

      const types: string[] = [];
      const keys: string[] = [];

      Object.keys(userArgsSchema).forEach((key) => {
        if (!userArgsSchema || !userArgsSchema[key]) return;
        keys.push(key);
        const value = userArgsSchema[key];
        switch (value) {
          case "number":
            types.push("uint256");
            break;
          case "string":
            types.push("string");
            break;
          case "boolean":
            types.push("bool");
            break;
          case "number[]":
            types.push("uint256[]");
            break;
          case "string[]":
            types.push("string[]");
            break;
          case "boolean[]":
            types.push("bool[]");
            break;
          default:
            throw new Error(
              `Invalid schema in web3Function CID: ${web3FunctionHash}. Invalid type ${value}. userArgsSchema: ${userArgsSchema}`
            );
        }
      });

      return { types, keys };
    } catch (err) {
      throw new Error(`Fail to get types from schema: ${err.message}`);
    }
  };
}
