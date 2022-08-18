import { encode } from "@msgpack/msgpack";
import { ethers } from "ethers";

export const encodeResolverArgs = (
  resolverAddress: string,
  resolverData: string
): string => {
  const encoded = ethers.utils.defaultAbiCoder.encode(
    ["address", "bytes"],
    [resolverAddress, resolverData]
  );

  return encoded;
};

export const encodeTimeArgs = (startTime: number, interval: number): string => {
  const encoded = ethers.utils.defaultAbiCoder.encode(
    ["uint128", "uint128"],
    [startTime, interval]
  );

  return encoded;
};

export const encodeOResolverArgs = (
  oResolverHash: string,
  userArgs: { [key: string]: unknown }
): string => {
  const userArgsBuffer = encode(userArgs);
  const userArgsHex = bufferToHex(userArgsBuffer);

  const encoded = ethers.utils.defaultAbiCoder.encode(
    ["string", "bytes"],
    [oResolverHash, userArgsHex]
  );

  return encoded;
};

export const bufferToHex = (buffer: Uint8Array): string => {
  const hex = [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const hexPrefixed = "0x" + hex;
  return hexPrefixed;
};
