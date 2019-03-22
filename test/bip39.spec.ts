import {
  getMnemonic,
  language,
  toSeedHex,
  validateMnemonic
} from "../src/index";

for (const lang of Object.keys(language)) {
  const tmp = getMnemonic(lang);
  console.assert(validateMnemonic(tmp, lang));
}

// get from https://iancoleman.io/bip39
const mnemonic =
  "ankle figure chuckle picnic enjoy learn cheese forest fiber minute type brother frost equal try";
const bip39seed =
  "d7b45bb76aa7e4de94a57551ab3e49c20b759c5c3795b0b09dfc9a3f719b92d4c9f71ebfff9d7766f8f81160be5d24bd98b565be2a277bea82c69ccfbdae86b6";
console.assert(toSeedHex(mnemonic) === bip39seed);
console.assert(validateMnemonic(mnemonic));

console.assert(!validateMnemonic("ankle figure"));
console.log("test successful");
