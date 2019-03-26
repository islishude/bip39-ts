bip39 implementation by TypeScript for Node.js

## Useage

```typescript
import {
  getMnemonic,
  getMnemonicByEntropy,
  language,
  toSeed,
  toSeedHex,
  validateMnemonic
} from "bip39-ts";

const mnemonic: string = getMnemonic(12, language.English);
console.log(validateMnemonic === true);
const seed: Buffer = toSeed(mnemonic);
const seedHex: string = toSeedHex(mnemonic);
```
