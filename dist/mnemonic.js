"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.language = {
    english: "english",
    french: "french",
    italian: "italian",
    japanese: "japanese",
    korean: "korean",
    spanish: "spanish",
    zh_CN: "zh_CN",
    zh_TW: "zh_TW"
};
const chinese_simplified_json_1 = __importDefault(require("./wordlist/chinese_simplified.json"));
const chinese_traditional_json_1 = __importDefault(require("./wordlist/chinese_traditional.json"));
const english_json_1 = __importDefault(require("./wordlist/english.json"));
const french_json_1 = __importDefault(require("./wordlist/french.json"));
const italian_json_1 = __importDefault(require("./wordlist/italian.json"));
const japanese_json_1 = __importDefault(require("./wordlist/japanese.json"));
const korean_json_1 = __importDefault(require("./wordlist/korean.json"));
const spanish_json_1 = __importDefault(require("./wordlist/spanish.json"));
exports.wordList = {
    english: english_json_1.default,
    french: french_json_1.default,
    italian: italian_json_1.default,
    japanese: japanese_json_1.default,
    korean: korean_json_1.default,
    spanish: spanish_json_1.default,
    zh_CN: chinese_simplified_json_1.default,
    zh_TW: chinese_traditional_json_1.default
};
exports.mLen = {
    12: {
        cs: 4,
        ent: 128
    },
    15: {
        cs: 5,
        ent: 160
    },
    18: {
        cs: 7,
        ent: 192
    },
    21: {
        cs: 5,
        ent: 224
    },
    24: {
        cs: 8,
        ent: 256
    }
};
