export declare const language: {
    english: string;
    french: string;
    italian: string;
    japanese: string;
    korean: string;
    spanish: string;
    zh_CN: string;
    zh_TW: string;
};
import * as zh_CN from "../wordlist/chinese_simplified.json";
export declare const wordList: {
    english: typeof zh_CN;
    french: typeof zh_CN;
    italian: typeof zh_CN;
    japanese: typeof zh_CN;
    korean: typeof zh_CN;
    spanish: typeof zh_CN;
    zh_CN: typeof zh_CN;
    zh_TW: typeof zh_CN;
};
export interface IBip39 {
    [index: number]: {
        cs: number;
        ent: number;
    };
}
export declare const mnemonicLength: IBip39;
