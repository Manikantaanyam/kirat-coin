import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  TOKEN_2022_PROGRAM_ID,
  getAccount,
} from "@solana/spl-token";

/**
 * Transfers tokens from one user to another.
 * Automatically creates the destination ATA if it doesn't exist.
 * * @param userKeypair The Keypair of the sender (must have private key to sign)
 * @param destinationPublicKey The address of the receiver
 */
export default async function transferWithAutoATA(
  userKeypair: Keypair, // Use Keypair here, not string
  destinationPublicKey: string,
  amt: string
) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const destPubkey = new PublicKey(destinationPublicKey);
  const mintAddress = new PublicKey(
    "4Ej9XcTahC3i3o9H42Sv7ymmR8Si5QcsfnBrL9yGhM9A"
  );

  // 1. Derive ATA addresses for both sender and receiver
  const senderATA = await getAssociatedTokenAddress(
    mintAddress,
    userKeypair.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const destATA = await getAssociatedTokenAddress(
    mintAddress,
    destPubkey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction();

  // 2. Check if Destination ATA exists. If not, add creation instruction.
  try {
    await getAccount(connection, destATA, "confirmed", TOKEN_2022_PROGRAM_ID);
  } catch (e) {
    // If account doesn't exist, getAccount throws an error
    console.log("Destination ATA missing. Adding creation instruction...");
    tx.add(
      createAssociatedTokenAccountInstruction(
        userKeypair.publicKey, // Payer of the rent
        destATA, // The ATA address to create
        destPubkey, // Owner of the new ATA
        mintAddress, // Token Mint
        TOKEN_2022_PROGRAM_ID
      )
    );
  }

  // 3. Add the transfer instruction
  const amount = BigInt(Math.round(parseFloat(amt) * Math.pow(10, 9)));
  tx.add(
    createTransferInstruction(
      senderATA,
      destATA,
      userKeypair.publicKey,
      amount,
      [],
      TOKEN_2022_PROGRAM_ID
    )
  );

  // 4. Send and Confirm
  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      tx,
      [userKeypair] // The user signs to authorize transfer AND pay rent
    );
    console.log("Success! Transaction ID:", signature);
    return signature;
  } catch (error) {
    console.error("Transfer failed:", error);
    throw error;
  }
}
