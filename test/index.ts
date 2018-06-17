import { assert, log } from "console";
import * as bip39 from "../src/index";

const mnemonic = bip39.getMnemonic();
assert(bip39.validateMnemonic(mnemonic));

let res = bip39.validateMnemonic(
  "ankle figure chuckle picnic enjoy learn cheese forest fiber minute type brother frost equal try"
);

assert(res === true);

res = bip39.validateMnemonic(
  "ankle figure chuckle picnic enjoy learn cheese forest fiber minute type brother frost equal wheel"
);
assert(res === false);
