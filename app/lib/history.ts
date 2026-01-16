import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export default async function getTransactionHistory(userPublicKey: string) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const userPubkey = new PublicKey(userPublicKey);
  const signatures = await connection.getSignaturesForAddress(userPubkey);

  console.log("signatures", signatures);
}
