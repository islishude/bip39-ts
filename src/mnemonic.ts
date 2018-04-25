export const language = {
  english: "english",
  french: "french",
  italian: "italian",
  japanese: "japanese",
  korean: "korean",
  spanish: "spanish",
  zh_CN: "zh_CN",
  zh_TW: "zh_TW"
};

import * as zh_CN from "../wordlist/chinese_simplified.json";
import * as zh_TW from "../wordlist/chinese_traditional.json";
import * as english from "../wordlist/english.json";
import * as french from "../wordlist/french.json";
import * as italian from "../wordlist/italian.json";
import * as japanese from "../wordlist/japanese.json";
import * as korean from "../wordlist/korean.json";
import * as spanish from "../wordlist/spanish.json";

export const wordList = {
  english,
  french,
  italian,
  japanese,
  korean,
  spanish,
  zh_CN,
  zh_TW
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

export interface IBip39 {
  [index: number]: {
    cs: number;
    ent: number;
  };
}

export const mnemonicLength: IBip39 = {
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
