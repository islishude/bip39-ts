"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
exports.padding = (data, max = 8, pad = "0") => {
    const len = data.length;
    if (len < max) {
        const repeat = pad.repeat(max - len);
        return repeat + data;
    }
    return data;
};
exports.sha256 = (data) => {
    return crypto_2.createHash("sha256")
        .update(data)
        .digest();
};
exports.getCheckSum = (buf, max) => {
    const tmp = exports.sha256(buf).slice(0, 1);
    return exports.bufToBinary(tmp).slice(0, max);
};
exports.bufToBinary = (buf) => {
    return Array.from(buf)
        .map(v => exports.padding(v.toString(2)))
        .join("");
};
exports.toUtf8 = (data) => {
    const nor = data.normalize("NFKD");
    return Buffer.from(nor, "utf8");
};
exports.pbkdf2 = (password, salt) => {
    return crypto_1.pbkdf2Sync(password, salt, 2048, 64, "sha512");
};
