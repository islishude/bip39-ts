import { randomBytes } from "crypto";
import { bufToBinary, getCheckSum, padding, pbkdf2, toUtf8 } from "./helper";
import { language, wordList } from "./mnemonic";
export { language };

const entropyToMnemonic = (
  entropy: Buffer,
  lang: string,
  csBitsLen: number
): string => {
  const words: string[] = wordList[lang];
  const checksum: string = getCheckSum(entropy, csBitsLen);
  const seed: string = bufToBinary(entropy) + checksum;

  const seedGroup = seed.match(/(.{11})/g);
  const res: string[] = [];

  for (const wordIndex of seedGroup) {
    const index = Number.parseInt(wordIndex, 2);
    res.push(words[index]);
  }

  return lang === language.japanese ? res.join("\u3000") : res.join("\x20");
};

export const getMnemonic = (
  wordLen: 12 | 15 | 18 | 21 | 24 = 12,
  lang: string = language.english
): string => {
  if (wordLen % 3 !== 0 || wordLen < 12 || wordLen > 24) {
    throw new Error("Invalid mnemonic length provied");
  }

  const entropy: Buffer = randomBytes(wordLen + wordLen / 3);
  return entropyToMnemonic(entropy, lang, wordLen / 3);
};

export const getMnemonicByEntropy = (
  entropy: string | Buffer,
  lang: string = language.english
): string => {
  if (typeof entropy === "string") {
    entropy = Buffer.from(entropy, "hex");
  }

  if (entropy.length < 16 || entropy.length > 32 || entropy.length % 4 !== 0) {
    throw new Error("Invalid entropy length");
  }

  return entropyToMnemonic(entropy, lang, (entropy.length / 4) * 3);
};

export const validateMnemonic = (
  mnemonic: string,
  lang: string = language.english
): boolean => {
  const wrodArray: string[] = mnemonic.normalize("NFKD").split("\x20");

  if (
    wrodArray.length < 12 ||
    wrodArray.length > 24 ||
    wrodArray.length % 3 !== 0
  ) {
    return false;
  }

  const list: string[] = wordList[lang];
  const tmp: string[] = [];

  for (const v of wrodArray) {
    const index: number = list.indexOf(v);
    if (index === -1) {
      return false;
    }
    tmp.push(padding(index.toString(2), 11));
  }

  const bits: string = tmp.join("");

  const dividerIndex = Math.floor(bits.length / 33) * 32;
  const entropyBits = bits.slice(0, dividerIndex);
  const checksumBits = bits.slice(dividerIndex);

  const entropyBytes = entropyBits
    .match(/(.{8})/g)
    .map(v => Number.parseInt(v, 2));

  if (
    entropyBytes.length < 16 ||
    entropyBytes.length > 32 ||
    entropyBytes.length % 4 !== 0
  ) {
    return false;
  }

  const thisCheck = getCheckSum(
    Buffer.from(entropyBytes),
    wrodArray.length / 3
  );
  return thisCheck === checksumBits;
};

export const toSeed = (mnemonic: string, salt: string = ""): Buffer => {
  const m = toUtf8(mnemonic);
  const s = toUtf8("mnemonic" + salt);
  return pbkdf2(m, s);
};

export const toSeedHex = (mnemonic: string, salt?: string): string => {
  return toSeed(mnemonic, salt).toString("hex");
};
