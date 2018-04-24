/// <reference types="node" />
declare const language: {
    english: string;
    french: string;
    italian: string;
    japanese: string;
    korean: string;
    spanish: string;
    zh_CN: string;
    zh_TW: string;
};
declare const getMnemonic: (lang?: string, len?: number) => string;
declare const toSeed: (mnemonic: string, salt?: string) => Buffer;
declare const toSeedHex: (mnemonic: string, salt?: string) => string;
export { toSeed, toSeedHex, language, getMnemonic };
