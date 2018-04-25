"use strict";
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
const zh_CN = require("../wordlist/chinese_simplified.json");
const zh_TW = require("../wordlist/chinese_traditional.json");
const english = require("../wordlist/english.json");
const french = require("../wordlist/french.json");
const italian = require("../wordlist/italian.json");
const japanese = require("../wordlist/japanese.json");
const korean = require("../wordlist/korean.json");
const spanish = require("../wordlist/spanish.json");
exports.wordList = {
    english,
    french,
    italian,
    japanese,
    korean,
    spanish,
    zh_CN,
    zh_TW
};
exports.mnemonicLength = {
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
