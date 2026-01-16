import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export default async function getSolBalance(publicKey: string) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const address = new PublicKey(publicKey);
  const balance = await connection.getBalance(address);
  return balance / LAMPORTS_PER_SOL;
}
