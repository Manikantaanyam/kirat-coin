import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";

export default function SolonaWallet(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/0'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  const secretKey = Keypair.fromSeed(derivedSeed).secretKey;

  const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

  const secretKeyBase58 = bs58.encode(secretKey);

  return {
    publicKey,
    secretKey: secretKeyBase58,
  };
}
