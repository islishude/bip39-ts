/// <reference types="node" />
import { language } from "./mnemonic";
declare const getMnemonic: (lang?: string, len?: number) => string;
declare const toSeed: (mnemonic: string, salt?: string) => Buffer;
declare const toSeedHex: (mnemonic: string, salt?: string) => string;
declare const validateMnemonic: (mnemonic: string, type?: string) => boolean;
export { toSeed, toSeedHex, language, getMnemonic, validateMnemonic };
