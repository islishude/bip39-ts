/// <reference types="node" />
import { language } from "./mnemonic";
export { language };
export declare const getMnemonic: (lang?: string, len?: number) => string;
export declare const validateMnemonic: (mnemonic: string, type?: string) => boolean;
export declare const toSeed: (mnemonic: string, salt?: string) => Buffer;
export declare const toSeedHex: (mnemonic: string, salt?: string) => string;
