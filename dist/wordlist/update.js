"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs_1 = require("fs");
const util_1 = require("util");
const write = util_1.promisify(fs_1.writeFile);
function getWordsList() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/";
        const words = [
            "chinese_simplified",
            "chinese_traditional",
            "english",
            "french",
            "italian",
            "japanese",
            "korean",
            "spanish",
        ];
        const getter = [];
        for (const word of words) {
            getter.push({ type: word, url: `${url}${word}.txt` });
        }
        const res = getter.map((v) => __awaiter(this, void 0, void 0, function* () {
            const tmp = yield axios_1.default.get(v.url);
            return {
                data: tmp.data,
                type: v.type,
            };
        }));
        for (const i of res) {
            const { type, data } = yield i;
            yield write(`./${type}.json`, JSON.stringify(data.split("\n")));
        }
    });
}
getWordsList().catch((err) => console.log(err.message));
