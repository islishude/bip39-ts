import { getMnemonic, language, toSeedHex } from "../index";

// const mnemonic = "wheel click skull song pelican cheese ten zoo soft token wing network tiger tag sight";

// const result = toSeedHex(mnemonic);

// const mnemonic = getMnemonic();

/* tslint:disable */
console.log(getMnemonic());
console.log(getMnemonic(language.zh_CN, 12));
console.log(getMnemonic(language.zh_TW, 12));
console.log(getMnemonic(language.spanish, 12));
console.log(getMnemonic(language.japanese, 12));
console.log(getMnemonic(language.korean, 12));
console.log(getMnemonic(language.zh_CN, 15));
console.log(getMnemonic(language.zh_TW, 15));
console.log(getMnemonic(language.spanish, 15));
console.log(getMnemonic(language.japanese, 15));
console.log(getMnemonic(language.korean, 15));
