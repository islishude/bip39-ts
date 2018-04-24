"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
const language = {
    english: "english",
    french: "french",
    italian: "italian",
    japanese: "japanese",
    korean: "korean",
    spanish: "spanish",
    zh_CN: "zh_CN",
    zh_TW: "zh_TW",
};
exports.language = language;
const zh_CN = require("../wordlist/chinese_simplified.json");
const zh_TW = require("../wordlist/chinese_traditional.json");
const english = require("../wordlist/english.json");
const french = require("../wordlist/french.json");
const italian = require("../wordlist/italian.json");
const japanese = require("../wordlist/japanese.json");
const korean = require("../wordlist/korean.json");
const spanish = require("../wordlist/spanish.json");
const wordList = {
    english,
    french,
    italian,
    japanese,
    korean,
    spanish,
    zh_CN,
    zh_TW,
};
const mnemonicLength = {
    12: {
        cs: 4,
        ent: 128,
    },
    15: {
        cs: 5,
        ent: 160,
    },
    18: {
        cs: 7,
        ent: 192,
    },
    21: {
        cs: 5,
        ent: 224,
    },
    24: {
        cs: 8,
        ent: 256,
    },
};
const getMnemonic = (lang = language.english, len = 12) => {
    const m = mnemonicLength[len];
    const entropy = crypto_2.randomBytes(m.ent);
    const checksumLen = m.cs;
    const words = wordList[lang];
    const checksum = crypto_2.createHash("sha256")
        .update(entropy)
        .digest()
        .slice(0, 1);
    const seed = Buffer.concat([entropy, checksum]);
    const seedString = Array.from(seed)
        .map((v) => {
        let tmp = v.toString(2);
        if (tmp.length < 8) {
            const repeat = 8 - tmp.length;
            const add = "0".repeat(repeat);
            tmp = add + tmp;
        }
        return tmp;
    })
        .join("")
        .slice(0, m.ent + m.cs);
    const seedGroup = seedString.match(/(.{11})/g);
    const res = [];
    for (const wordIndex of seedGroup) {
        const index = Number.parseInt(wordIndex, 2);
        res.push(words[index]);
    }
    return lang === "japanese" ? res.join("\u3000") : res.join(" ");
};
exports.getMnemonic = getMnemonic;
const toUtf8 = (data) => {
    const nor = data.normalize("NFKD");
    return Buffer.from(nor, "utf8");
};
const pbkdf2 = (password, salt) => {
    return crypto_1.pbkdf2Sync(password, salt, 2048, 64, "sha512");
};
const toSeed = (mnemonic, salt = "") => {
    const m = toUtf8(mnemonic);
    const s = toUtf8("mnemonic" + salt);
    return pbkdf2(m, s);
};
exports.toSeed = toSeed;
const toSeedHex = (mnemonic, salt) => {
    return toSeed(mnemonic, salt).toString("hex");
};
exports.toSeedHex = toSeedHex;
