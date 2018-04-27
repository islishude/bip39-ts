import { getMnemonic, language, toSeedHex } from "../src/index";

// const mnemonic = "wheel click skull song pelican cheese ten zoo soft token wing network tiger tag sight";

// const result = toSeedHex(mnemonic);

// const mnemonic = getMnemonic();

const log = console.log

log(getMnemonic());
log(getMnemonic(language.zh_CN, 12));
log(getMnemonic(language.zh_TW, 12));
log(getMnemonic(language.spanish, 12));
log(getMnemonic(language.japanese, 12));
log(getMnemonic(language.korean, 12));
log(getMnemonic(language.zh_CN, 15));
log(getMnemonic(language.zh_TW, 15));
log(getMnemonic(language.spanish, 15));
log(getMnemonic(language.japanese, 15));
log(getMnemonic(language.korean, 15));
