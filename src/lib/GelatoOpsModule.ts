/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty */
import { encode, decode } from "@msgpack/msgpack";
import { ethers } from "ethers";
import {
  JsResolverParams,
  JsResolverUserArgs,
  JsResolverUserArgsSchema,
  Module,
  ModuleArgsParams,
  ModuleData,
  OffChainResolverParams,
  ResolverParams,
  TimeParams,
} from "../types";
import { JsResolverDownloader } from "./JsResolver/JsResolverDownloader";

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
      jsResolverHash,
      jsResolverArgs,
      jsResolverArgsHex,
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
    } else if (jsResolverHash && jsResolverArgsHex) {
      modules.push(Module.ORESOLVER);
      args.push(
        await this.encodeJsResolverArgs(
          jsResolverHash,
          undefined,
          jsResolverArgsHex
        )
      );
    } else if (jsResolverHash && jsResolverArgs) {
      modules.push(Module.ORESOLVER);
      args.push(
        await this.encodeJsResolverArgs(jsResolverHash, jsResolverArgs)
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
      jsResolverHash: null,
      jsResolverArgs: null,
      jsResolverArgsHex: null,
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

      if (offChainResolverArgs) {
        moduleArgsDecoded.offChainResolverHash = offChainResolverHash;
        moduleArgsDecoded.offChainResolverArgs = offChainResolverArgs;
        moduleArgsDecoded.offChainResolverArgsHex = offChainResolverArgsHex;
      } else {
        const { jsResolverHash, jsResolverArgs, jsResolverArgsHex } =
          await this.decodeJsResolverArgs(args[indexOfModule]);

        if (jsResolverArgs) {
          moduleArgsDecoded.jsResolverHash = jsResolverHash;
          moduleArgsDecoded.jsResolverArgs = jsResolverArgs;
          moduleArgsDecoded.jsResolverArgsHex = jsResolverArgsHex;
        }
      }
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

  public encodeJsResolverArgs = async (
    jsResolverHash: string,
    jsResolverArgs?: JsResolverUserArgs,
    jsResolverArgsHex?: string
  ): Promise<string> => {
    try {
      if (!jsResolverArgsHex && jsResolverArgs) {
        const { types, keys } = await this.getAbiTypesAndKeysFromSchema(
          jsResolverHash
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
          if (typeof jsResolverArgs[key] === "undefined") {
            throw new Error(
              `Missing user arg '${key}' defined in resolver schema`
            );
          }
          values.push(jsResolverArgs[key]);
        }

        jsResolverArgsHex = ethers.utils.defaultAbiCoder.encode(types, values);
      }

      const encoded = ethers.utils.defaultAbiCoder.encode(
        ["string", "bytes"],
        [jsResolverHash, jsResolverArgsHex]
      );

      return encoded;
    } catch (err) {
      throw new Error(`Fail to encode JsResolverArgs: ${err.message}`);
    }
  };

  public decodeJsResolverArgs = async (
    encodedModuleArgs: string
  ): Promise<JsResolverParams> => {
    let jsResolverHash: string | null = null;
    let jsResolverArgs: JsResolverUserArgs | null = null;
    let jsResolverArgsHex: string | null = null;

    try {
      [jsResolverHash, jsResolverArgsHex] = ethers.utils.defaultAbiCoder.decode(
        ["string", "bytes"],
        encodedModuleArgs
      );

      jsResolverArgs = await this.decodeJsResolverArgsHex(
        jsResolverArgsHex as string,
        {
          jsResolverHash: jsResolverHash as string,
        }
      );
    } catch (err) {
      console.error(`Fail to decode JsResolverArgs: ${err.message}`);
    }

    return { jsResolverHash, jsResolverArgs, jsResolverArgsHex };
  };

  public decodeJsResolverArgsHex = async (
    jsResolverArgsHex: string,
    schema: {
      jsResolverHash?: string;
      userArgsSchema?: JsResolverUserArgsSchema;
    }
  ): Promise<JsResolverUserArgs | null> => {
    try {
      let schemaAbi: { types: string[]; keys: string[] };
      const jsResolverArgs: JsResolverUserArgs = {};
      if (schema.jsResolverHash)
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          schema.jsResolverHash
        );
      else
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          undefined,
          schema.userArgsSchema
        );

      const { types, keys } = schemaAbi;
      const jsResolverArgsValues = ethers.utils.defaultAbiCoder.decode(
        types,
        jsResolverArgsHex as string
      ) as never[];
      // decode argument according to schema key order
      keys.forEach(
        (key, idx) => (jsResolverArgs[key] = jsResolverArgsValues[idx])
      );

      return jsResolverArgs;
    } catch (err) {
      console.error(`Fail to decode JsResolverArgsHex: ${err.message}`);
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
    jsResolverHash?: string,
    _userArgsSchema?: JsResolverUserArgsSchema
  ): Promise<{ keys: string[]; types: string[] }> => {
    try {
      let userArgsSchema = _userArgsSchema;

      if (!userArgsSchema) {
        if (jsResolverHash) {
          const downloader = new JsResolverDownloader();
          const schema = await downloader.fetchSchema(jsResolverHash);
          userArgsSchema = schema.userArgs;
        } else
          throw new Error(`Both userArgsSchema && jsResolverHash undefined`);
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
              `Invalid schema in jsResolver CID: ${jsResolverHash}. Invalid type ${value}. userArgsSchema: ${userArgsSchema}`
            );
        }
      });

      return { types, keys };
    } catch (err) {
      throw new Error(`Fail to get types from schema: ${err.message}`);
    }
  };
}
