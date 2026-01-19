import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export async function getSignatures(userPubKey: string) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const userPub = new PublicKey(userPubKey);
  try {
    const signatures = await connection.getSignaturesForAddress(userPub);
    console.log("sign", signatures);
    return signatures;
  } catch (e) {
    console.log("Error occured while fetching Transactions");
  }
}
