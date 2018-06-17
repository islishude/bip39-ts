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
export declare const wordList: {
    english: string[];
    french: string[];
    italian: string[];
    japanese: string[];
    korean: string[];
    spanish: string[];
    zh_CN: string[];
    zh_TW: string[];
};
export interface IBip39 {
    [index: number]: {
        cs: number;
        ent: number;
    };
}
export declare const mLen: IBip39;
