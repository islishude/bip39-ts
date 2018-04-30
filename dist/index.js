"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const helper_1 = require("./helper");
const mnemonic_1 = require("./mnemonic");
exports.language = mnemonic_1.language;
const getMnemonic = (lang = mnemonic_1.language.english, len = 12) => {
    if (len % 3 !== 0 || len < 12) {
        throw new Error("The mnemonic length should be % 3 is equal with 0");
    }
    const m = mnemonic_1.mnemonicLength[len];
    const entropy = crypto_1.randomBytes(m.ent);
    const words = mnemonic_1.wordList[lang];
    const checksum = helper_1.sha256(entropy).slice(0, 1);
    const seed = helper_1.bufToBinary(Buffer.concat([entropy, checksum])).slice(0, m.ent + m.cs);
    const seedGroup = seed.match(/(.{11})/g);
    const res = [];
    for (const wordIndex of seedGroup) {
        const index = Number.parseInt(wordIndex, 2);
        res.push(words[index]);
    }
    return lang === "japanese" ? res.join("\u3000") : res.join(" ");
};
exports.getMnemonic = getMnemonic;
const toSeed = (mnemonic, salt = "") => {
    const m = helper_1.toUtf8(mnemonic);
    const s = helper_1.toUtf8("mnemonic" + salt);
    return helper_1.pbkdf2(m, s);
};
exports.toSeed = toSeed;
const toSeedHex = (mnemonic, salt) => {
    return toSeed(mnemonic, salt).toString("hex");
};
exports.toSeedHex = toSeedHex;
const validateMnemonic = (mnemonic, type = mnemonic_1.language.english) => {
    const m = mnemonic.normalize("NFKD").split(" ");
    if (m.length % 3 !== 0) {
        return false;
    }
    const list = mnemonic_1.wordList[type];
    const tmp = [];
    m.forEach(v => {
        const index = list.indexOf(v);
        if (index === -1) {
            return false;
        }
        tmp.push(helper_1.padding(index.toString(2), 11));
    });
    const bits = tmp.join("");
    const dividerIndex = Math.floor(bits.length / 33) * 32;
    const entropyBits = bits.slice(0, dividerIndex);
    const checksumBits = bits.slice(dividerIndex);
    const entropyBytes = entropyBits
        .match(/(.{8})/g)
        .map(v => Number.parseInt(v, 2));
    if (entropyBits.length < 16 ||
        entropyBits.length > 32 ||
        entropyBits.length % 4 !== 0) {
        return false;
    }
    const entropy = Buffer.from(entropyBits);
    if (helper_1.getCheckSum(entropy, mnemonic_1.mnemonicLength[m.length].cs) !== checksumBits) {
        return false;
    }
    return true;
};
exports.validateMnemonic = validateMnemonic;
