import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export default async function sendSolana(
  keypair: Keypair,
  destinationPublicKey: string,
  amount: number
) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  try {
    const destinationPubKey = new PublicKey(destinationPublicKey);

    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    const lamports = Math.round(amount * LAMPORTS_PER_SOL);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: destinationPubKey,
        lamports,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
    ]);

    return signature;
  } catch (error: any) {
    console.error("Transaction failed", error);
    throw error;
  }
}
