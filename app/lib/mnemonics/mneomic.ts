import { generateMnemonic } from "bip39";

export default function generateMnemonics() {
  return generateMnemonic(128);
}
