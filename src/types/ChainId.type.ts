import { CHAIN_ID } from "../constants";

export declare type Network = keyof typeof CHAIN_ID;

export declare type ChainId = (typeof CHAIN_ID)[Network];
