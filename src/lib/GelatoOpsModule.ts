/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty */
import { encode, decode } from "@msgpack/msgpack";
import {
  JsResolverUserArgs,
  JsResolverUserArgsSchema,
} from "@gelatonetwork/js-resolver-sdk";
import { JsResolverUploader } from "@gelatonetwork/js-resolver-sdk/uploader";
import { ethers } from "ethers";
import {
  JsResolverParams,
  Module,
  ModuleArgsParams,
  ModuleData,
  OffChainResolverParams,
  ResolverParams,
  TimeParams,
} from "../types";

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
      dedicatedMsgSender,
      singleExec,
      offChainResolverHash,
      offChainResolverArgs,
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
      // attempt to decode both ways (OResolver & JsResolver)
      // params will be populated if decoded successfully
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
      }

      const { jsResolverHash, jsResolverArgs, jsResolverArgsHex } =
        await this.decodeJsResolverArgs(args[indexOfModule]);

      if (jsResolverArgs) {
        moduleArgsDecoded.jsResolverHash = jsResolverHash;
        moduleArgsDecoded.jsResolverArgs = jsResolverArgs;
        moduleArgsDecoded.jsResolverArgsHex = jsResolverArgsHex;
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
    jsResolverArgs: JsResolverUserArgs
  ): Promise<string> => {
    try {
      const types = await this.getAbiTypesFromSchema(jsResolverHash);
      const values = Object.values(jsResolverArgs);

      const jsResolverArgsHex = ethers.utils.defaultAbiCoder.encode(
        types,
        values
      );

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
    let types: string[] = [];
    let jsResolverArgs: JsResolverUserArgs | null = null;

    try {
      if (schema.jsResolverHash)
        types = await this.getAbiTypesFromSchema(schema.jsResolverHash);
      else
        types = await this.getAbiTypesFromSchema(
          undefined,
          schema.userArgsSchema
        );

      jsResolverArgs = ethers.utils.defaultAbiCoder.decode(
        types,
        jsResolverArgsHex as string
      );
    } catch (err) {
      console.error(`Fail to decode JsResolverArgsHex: ${err.message}`);
    }

    return jsResolverArgs;
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

  private getAbiTypesFromSchema = async (
    jsResolverHash?: string,
    _userArgsSchema?: JsResolverUserArgsSchema
  ): Promise<string[]> => {
    try {
      let userArgsSchema = _userArgsSchema;

      if (!userArgsSchema) {
        if (jsResolverHash) {
          const schema = await JsResolverUploader.fetchSchema(jsResolverHash);
          userArgsSchema = schema.userArgs;
        } else
          throw new Error(`Both userArgsSchema && jsResolverHash undefined`);
      }

      const types: string[] = [];

      Object.values(userArgsSchema).forEach((value) => {
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

      return types;
    } catch (err) {
      throw new Error(`Fail to get types from schema: ${err.message}`);
    }
  };
}
