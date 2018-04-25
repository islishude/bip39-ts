import { pbkdf2Sync } from "crypto";
import { createHash, randomBytes } from "crypto";
import {
  bufToBinary,
  getCheckSum,
  padding,
  pbkdf2,
  sha256,
  toUtf8
} from "./helper";
import { language, mnemonicLength, wordList } from "./mnemonic";

import * as zh_CN from "../wordlist/chinese_simplified.json";
import * as zh_TW from "../wordlist/chinese_traditional.json";
import * as english from "../wordlist/english.json";
import * as french from "../wordlist/french.json";
import * as italian from "../wordlist/italian.json";
import * as japanese from "../wordlist/japanese.json";
import * as korean from "../wordlist/korean.json";
import * as spanish from "../wordlist/spanish.json";

const getMnemonic = (
  lang: string = language.english,
  len: number = 12
): string => {
  if (len % 3 !== 0 || len < 12) {
    throw new Error("The mnemonic length should be % 3 is equal with 0");
  }

  const m = mnemonicLength[len];
  const entropy: Buffer = randomBytes(m.ent);
  const words: string[] = wordList[lang];
  const checksum: Buffer = sha256(entropy).slice(0, 1);

  const seed: string = bufToBinary(Buffer.concat([entropy, checksum])).slice(
    0,
    m.ent + m.cs
  );

  const seedGroup = seed.match(/(.{11})/g);
  const res: string[] = [];

  for (const wordIndex of seedGroup) {
    const index = Number.parseInt(wordIndex, 2);
    res.push(words[index]);
  }

  return lang === "japanese" ? res.join("\u3000") : res.join(" ");
};

const toSeed = (mnemonic: string, salt: string = "") => {
  const m = toUtf8(mnemonic);
  const s = toUtf8("mnemonic" + salt);
  return pbkdf2(m, s);
};

const toSeedHex = (mnemonic: string, salt?: string): string => {
  return toSeed(mnemonic, salt).toString("hex");
};

const validateMnemonic = (
  mnemonic: string,
  type: string = language.english
): boolean => {
  const m: string[] = mnemonic.normalize("NFKD").split(" ");

  if (m.length % 3 !== 0) {
    return false;
  }

  const list: string[] = wordList[type];
  const tmp: string[] = [];

  m.forEach(v => {
    const index: number = list.indexOf(v);
    if (index === -1) {
      return false;
    }
    tmp.push(padding(index.toString(2), 11));
  });

  const bits: string = tmp.join("");

  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);

  const entropyBytes = entropyBits
    .match(/(.{8})/g)
    .map(v => Number.parseInt(v, 2));

  if (
    entropyBits.length < 16 ||
    entropyBits.length > 32 ||
    entropyBits.length % 4 !== 0
  ) {
    return false;
  }

  const entropy = Buffer.from(entropyBits);

  if (getCheckSum(entropy, mnemonicLength[m.length].cs) !== checksumBits) {
    return false;
  }

  return true;
};

export { toSeed, toSeedHex, language, getMnemonic };
