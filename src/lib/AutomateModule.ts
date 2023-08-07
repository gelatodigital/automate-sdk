/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty */
import { BigNumber, ethers } from "ethers";
import {
  Module,
  ModuleArgsParams,
  ModuleData,
  ResolverParams,
  TimeParams,
  TriggerParams,
  Web3FunctionParams,
  Web3FunctionSchema,
  Web3FunctionUserArgs,
  Web3FunctionUserArgsSchema,
} from "../types";
import { TriggerConfig, TriggerType } from "../types/Trigger.interface";
import { Web3FunctionDownloader } from "./Web3Function/Web3FunctionDownloader";

export class AutomateModule {
  public encodeModuleArgs = async (
    moduleArgsParams: Partial<ModuleArgsParams>,
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
      web3FunctionHash,
      web3FunctionArgs,
      web3FunctionArgsHex,
      triggerConfig,
    } = moduleArgsParams;

    if (resolverAddress && resolverData) {
      modules.push(Module.RESOLVER);
      args.push(this.encodeResolverArgs(resolverAddress, resolverData));
    }

    if (interval) {
      const start = startTime ?? 0;
      modules.push(Module.TIME);
      args.push(this.encodeTimeArgs(start, interval));
    } else {
      if (singleExec && startTime) {
        modules.push(Module.TIME);
        args.push(this.encodeTimeArgs(startTime, 1));
      }
    }

    if (dedicatedMsgSender) {
      modules.push(Module.PROXY);
      args.push("0x");
    }

    if (singleExec) {
      modules.push(Module.SINGLE_EXEC);
      args.push("0x");
    }

    if (web3FunctionHash && web3FunctionArgsHex) {
      modules.push(Module.WEB3_FUNCTION);
      args.push(
        await this.encodeWeb3FunctionArgs(
          web3FunctionHash,
          undefined,
          web3FunctionArgsHex,
        ),
      );
    } else if (web3FunctionHash && web3FunctionArgs) {
      modules.push(Module.WEB3_FUNCTION);
      args.push(
        await this.encodeWeb3FunctionArgs(web3FunctionHash, web3FunctionArgs),
      );
    }

    if (triggerConfig) {
      modules.push(Module.TRIGGER);
      args.push(await this.encodeTriggerArgs(triggerConfig));
    }

    return { modules, args };
  };

  public decodeModuleArgs = async (
    moduleData: ModuleData,
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
      web3FunctionHash: null,
      web3FunctionArgs: null,
      web3FunctionArgsHex: null,
      triggerConfig: null,
    };

    if (modules.includes(Module.RESOLVER)) {
      const indexOfModule = modules.indexOf(Module.RESOLVER);
      const { resolverAddress, resolverData } = this.decodeResolverArgs(
        args[indexOfModule],
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

    if (modules.includes(Module.WEB3_FUNCTION)) {
      const indexOfModule = modules.indexOf(Module.WEB3_FUNCTION);

      const {
        web3FunctionHash,
        web3FunctionArgs,
        web3FunctionArgsHex,
        web3FunctionSchema,
      } = await this.decodeWeb3FunctionArgs(args[indexOfModule]);

      moduleArgsDecoded.web3FunctionHash = web3FunctionHash;
      moduleArgsDecoded.web3FunctionArgs = web3FunctionArgs;
      moduleArgsDecoded.web3FunctionArgsHex = web3FunctionArgsHex;
      moduleArgsDecoded.web3FunctionSchema = web3FunctionSchema;
    }

    if (modules.includes(Module.TRIGGER)) {
      const indexOfModule = modules.indexOf(Module.TRIGGER);

      const { triggerConfig } = await this.decodeTriggerArgs(
        args[indexOfModule],
      );

      moduleArgsDecoded.triggerConfig = triggerConfig;
    }

    return moduleArgsDecoded;
  };

  public encodeResolverArgs = (
    resolverAddress: string,
    resolverData: string,
  ): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["address", "bytes"],
      [resolverAddress, resolverData],
    );

    return encoded;
  };

  public decodeResolverArgs = (encodedModuleArgs: string): ResolverParams => {
    let resolverAddress: string | null = null;
    let resolverData: string | null = null;

    try {
      [resolverAddress, resolverData] = ethers.utils.defaultAbiCoder.decode(
        ["address", "bytes"],
        encodedModuleArgs,
      );
    } catch {}

    return { resolverAddress, resolverData };
  };

  public encodeTimeArgs = (startTime: number, interval: number): string => {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["uint128", "uint128"],
      [startTime, interval],
    );

    return encoded;
  };

  public decodeTimeArgs = (encodedModuleArgs: string): TimeParams => {
    let startTime: number | null = null;
    let interval: number | null = null;

    try {
      [startTime, interval] = ethers.utils.defaultAbiCoder.decode(
        ["uint128", "uint128"],
        encodedModuleArgs,
      );
    } catch {}

    return { startTime, interval };
  };

  public encodeWeb3FunctionArgs = async (
    web3FunctionHash: string,
    web3FunctionArgs?: Web3FunctionUserArgs,
    web3FunctionArgsHex?: string,
  ): Promise<string> => {
    try {
      if (!web3FunctionArgsHex && web3FunctionArgs) {
        const { types, keys } = await this.getAbiTypesAndKeysFromSchema(
          web3FunctionHash,
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
              `Missing user arg '${key}' defined in resolver schema`,
            );
          }
          values.push(web3FunctionArgs[key]);
        }

        web3FunctionArgsHex = ethers.utils.defaultAbiCoder.encode(
          types,
          values,
        );
      }

      const encoded = ethers.utils.defaultAbiCoder.encode(
        ["string", "bytes"],
        [web3FunctionHash, web3FunctionArgsHex],
      );

      return encoded;
    } catch (err) {
      throw new Error(`Fail to encode Web3Function: ${err.message}`);
    }
  };

  public decodeWeb3FunctionArgs = async (
    encodedModuleArgs: string,
  ): Promise<Web3FunctionParams> => {
    let web3FunctionHash: string | null = null;
    let web3FunctionArgs: Web3FunctionUserArgs | null = null;
    let web3FunctionArgsHex: string | null = null;
    let web3FunctionSchema: Web3FunctionSchema | undefined;

    [web3FunctionHash, web3FunctionArgsHex] =
      ethers.utils.defaultAbiCoder.decode(
        ["string", "bytes"],
        encodedModuleArgs,
      );

    const res = await this.decodeWeb3FunctionArgsHex(
      web3FunctionArgsHex as string,
      {
        web3FunctionHash: web3FunctionHash as string,
      },
    );
    if (res) {
      web3FunctionArgs = res.web3FunctionArgs;
      web3FunctionSchema = res.schema;
    }

    return {
      web3FunctionHash,
      web3FunctionArgs,
      web3FunctionArgsHex,
      web3FunctionSchema,
    };
  };

  public encodeTriggerArgs = async (
    triggerConfig: TriggerConfig,
  ): Promise<string> => {
    let triggerArgs: string;

    if (triggerConfig.type === TriggerType.TIME) {
      const triggerBytes = ethers.utils.defaultAbiCoder.encode(
        ["uint128", "uint128"],
        [triggerConfig.start ?? 0, triggerConfig.interval],
      );

      triggerArgs = ethers.utils.defaultAbiCoder.encode(
        ["uint128", "bytes"],
        [Number(TriggerType.TIME), triggerBytes],
      );
    } else {
      const triggerBytes = ethers.utils.defaultAbiCoder.encode(
        ["string"],
        [triggerConfig.cron],
      );

      triggerArgs = ethers.utils.defaultAbiCoder.encode(
        ["uint8", "bytes"],
        [Number(TriggerType.CRON), triggerBytes],
      );
    }

    return triggerArgs;
  };

  public decodeTriggerArgs = async (
    encodedModuleArgs: string,
  ): Promise<TriggerParams> => {
    let type: number | null = null;
    let encodedTriggerConfig: string | null = null;
    let triggerConfig: TriggerConfig | null = null;

    try {
      [type, encodedTriggerConfig] = ethers.utils.defaultAbiCoder.decode(
        ["uint8", "bytes"],
        encodedModuleArgs,
      );

      if (type !== null && encodedTriggerConfig !== null) {
        if (type === TriggerType.TIME) {
          let [start, interval] = ethers.utils.defaultAbiCoder.decode(
            ["uint128", "uint128"],
            encodedTriggerConfig,
          );

          if (start !== null && interval !== null) {
            if (typeof start === "object" && start instanceof BigNumber) {
              start = start.toNumber();
            }
            if (typeof interval === "object" && interval instanceof BigNumber) {
              interval = interval.toNumber();
            }
            triggerConfig = { type, start, interval };
          }
        } else if (type === TriggerType.CRON) {
          const [cron] = ethers.utils.defaultAbiCoder.decode(
            ["string"],
            encodedTriggerConfig,
          );

          if (cron !== null) {
            triggerConfig = { type, cron };
          }
        }
      }
    } catch {}

    return { triggerConfig };
  };

  public decodeWeb3FunctionArgsHex = async (
    web3FunctionArgsHex: string,
    schemaOption: {
      web3FunctionHash?: string;
      userArgsSchema?: Web3FunctionUserArgsSchema;
    },
  ): Promise<{
    web3FunctionArgs: Web3FunctionUserArgs;
    schema?: Web3FunctionSchema;
  } | null> => {
    try {
      let schemaAbi: {
        types: string[];
        keys: string[];
        schema?: Web3FunctionSchema;
      };
      const web3FunctionArgs: Web3FunctionUserArgs = {};
      if (schemaOption.web3FunctionHash)
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          schemaOption.web3FunctionHash,
        );
      else
        schemaAbi = await this.getAbiTypesAndKeysFromSchema(
          undefined,
          schemaOption.userArgsSchema,
        );

      const { types, keys, schema } = schemaAbi;
      const web3FunctionArgsValues = ethers.utils.defaultAbiCoder.decode(
        types,
        web3FunctionArgsHex,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any[];

      // decode argument according to schema key order
      keys.forEach((key, idx) => {
        let val = web3FunctionArgsValues[idx];

        // Transform BigNumber[] in number[]
        if (Array.isArray(val)) {
          val = val.map((v) => {
            if (typeof v === "object" && v instanceof BigNumber) {
              return v.toNumber();
            }
            return v;
          });
          // Transform BigNumber in number
        } else if (typeof val === "object" && val instanceof BigNumber) {
          val = val.toNumber();
        }

        web3FunctionArgs[key] = val;
      });

      return { web3FunctionArgs, schema };
    } catch (err) {
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
    _userArgsSchema?: Web3FunctionUserArgsSchema,
  ): Promise<{
    keys: string[];
    types: string[];
    schema?: Web3FunctionSchema;
  }> => {
    try {
      let userArgsSchema = _userArgsSchema;
      let schema: Web3FunctionSchema | undefined;

      if (!userArgsSchema) {
        if (web3FunctionHash) {
          const downloader = new Web3FunctionDownloader();
          schema = await downloader.fetchSchema(web3FunctionHash);
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
              `Invalid schema in web3Function CID: ${web3FunctionHash}. Invalid type ${value}. userArgsSchema: ${userArgsSchema}`,
            );
        }
      });

      return { types, keys, schema };
    } catch (err) {
      throw new Error(`Fail to get types from schema: ${err.message}`);
    }
  };
}
