import { randomBytes } from "crypto";
import { bufToBinary, getCheckSum, padding, pbkdf2, toUtf8 } from "./helper";
import { language, mLen, wordList } from "./mnemonic";
export { language };

export const getMnemonic = (
  lang: string = language.english,
  len: 12 | 15 | 18 | 21 | 24 = 12
): string => {
  if (len % 3 !== 0 || len < 12 || len > 24) {
    throw new Error("Invalid mnemonic length provied");
  }

  const m = mLen[len];
  const entropy: Buffer = randomBytes(m.ent / 8);
  const words: string[] = wordList[lang];

  const checksum: string = getCheckSum(entropy, m.cs);
  const seed: string = bufToBinary(entropy) + checksum;

  const seedGroup = seed.match(/(.{11})/g);
  const res: string[] = [];

  for (const wordIndex of seedGroup) {
    const index = Number.parseInt(wordIndex, 2);
    res.push(words[index]);
  }

  return lang === language.japanese ? res.join("\u3000") : res.join("\x20");
};

export const validateMnemonic = (
  mnemonic: string,
  type: string = language.english
): boolean => {
  const m: string[] = mnemonic.normalize("NFKD").split("\x20");

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
    entropyBytes.length < 16 ||
    entropyBytes.length > 32 ||
    entropyBytes.length % 4 !== 0
  ) {
    return false;
  }

  const entropy = Buffer.from(entropyBytes);
  const thisCheck = getCheckSum(entropy, mLen[m.length].cs);
  if (thisCheck !== checksumBits) {
    return false;
  }

  return true;
};

export const toSeed = (mnemonic: string, salt: string = ""): Buffer => {
  const m = toUtf8(mnemonic);
  const s = toUtf8("mnemonic" + salt);
  return pbkdf2(m, s);
};

export const toSeedHex = (mnemonic: string, salt?: string): string => {
  return toSeed(mnemonic, salt).toString("hex");
};
