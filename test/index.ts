import * as bip39 from "../src/index";

// const mnemonic = "wheel click skull song pelican cheese ten zoo soft token wing network tiger tag sight";

// const result = toSeedHex(mnemonic);

// const mnemonic = getMnemonic();

const log = console.log

const mnemonic = bip39.getMnemonic()
log(mnemonic);


let res = bip39.validateMnemonic(mnemonic)

log(res)

res = bip39.validateMnemonic("wheel wheel")
log(res)