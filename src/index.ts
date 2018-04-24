import { pbkdf2Sync } from "crypto";
// import { TextEncoder } from "util";
import { createHash, randomBytes } from "crypto";

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

import * as zh_CN from "./wordlist/chinese_simplified.json";
import * as zh_TW from "./wordlist/chinese_traditional.json";
import * as english from "./wordlist/english.json";
import * as french from "./wordlist/french.json";
import * as italian from "./wordlist/italian.json";
import * as japanese from "./wordlist/japanese.json";
import * as korean from "./wordlist/korean.json";
import * as spanish from "./wordlist/spanish.json";

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

// checksum
// CS = ENT / 32
// mnemonic sentence
// MS = (ENT + CS) / 11
// ENT = entropy

// |  ENT  | CS | ENT+CS |  MS  |
// +-------+----+--------+------+
// |  128  |  4 |   132  |  12  |
// |  160  |  5 |   165  |  15  |
// |  192  |  6 |   198  |  18  |
// |  224  |  7 |   231  |  21  |
// |  256  |  8 |   264  |  24  |

interface IBip39 {
  [index: number]: {
    cs: number;
    ent: number;
  };
}

const mnemonicLength: IBip39 = {
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

const getMnemonic = (
  lang: string = language.english,
  len: number = 12,
): string => {
  const m = mnemonicLength[len];
  const entropy: Buffer = randomBytes(m.ent);
  const checksumLen: number = m.cs;
  const words: string[] = wordList[lang] as string[];
  const checksum: Buffer = createHash("sha256")
    .update(entropy)
    .digest()
    .slice(0, 1);
  const seed = Buffer.concat([entropy, checksum]);

  const seedString: string = Array.from(seed)
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
  const res: string[] = [];

  for (const wordIndex of seedGroup) {
    const index = Number.parseInt(wordIndex, 2);
    res.push(words[index]);
  }

  return lang === "japanese" ? res.join("\u3000") : res.join(" ");
};

const toUtf8 = (data: string): Buffer => {
  const nor: string = data.normalize("NFKD");
  //   const enc: ArrayBuffer = u8.encode(nor).buffer;
  return Buffer.from(nor, "utf8");
};

const pbkdf2 = (password: Buffer, salt: Buffer) => {
  return pbkdf2Sync(password, salt, 2048, 64, "sha512");
};

const toSeed = (mnemonic: string, salt: string = "") => {
  const m = toUtf8(mnemonic);
  const s = toUtf8("mnemonic" + salt);
  return pbkdf2(m, s);
};

const toSeedHex = (mnemonic: string, salt?: string): string => {
  return toSeed(mnemonic, salt).toString("hex");
};

export { toSeed, toSeedHex, language, getMnemonic };
