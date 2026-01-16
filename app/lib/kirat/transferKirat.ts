import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";

export default async function transfer100xDevs(
  keypair: Keypair,
  destinationPublicKey: string,
  amt: number
) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const destinationPubKey = new PublicKey(destinationPublicKey);
  const mintAddress = new PublicKey(
    "4Ej9XcTahC3i3o9H42Sv7ymmR8Si5QcsfnBrL9yGhM9A"
  );

  const balance = await connection.getBalance(keypair.publicKey);
  if (balance < 0.003 * 10 ** 9) {
    throw new Error(
      "You need at least 0.003 SOL to pay for transaction fees and account rent."
    );
  }

  const userATA = await getAssociatedTokenAddress(
    mintAddress,
    keypair.publicKey,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  const destATA = await getAssociatedTokenAddress(
    mintAddress,
    destinationPubKey,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction();
  try {
    await getAccount(connection, destATA, "confirmed", TOKEN_2022_PROGRAM_ID);
  } catch (e) {
    tx.add(
      createAssociatedTokenAccountInstruction(
        keypair.publicKey,
        destATA,
        destinationPubKey,
        mintAddress,
        TOKEN_2022_PROGRAM_ID
      )
    );
  }

  const amount = BigInt(Math.round(amt * Math.pow(10, 9)));
  tx.add(
    createTransferInstruction(
      userATA,
      destATA,
      keypair.publicKey,
      amount,
      [],
      TOKEN_2022_PROGRAM_ID
    )
  );

  try {
    const signature = await sendAndConfirmTransaction(connection, tx, [
      keypair,
    ]);

    console.log("Success! Transaction ID:", signature);
    return signature;
  } catch (e) {
    console.error("Transfer failed:", e);
    throw e;
  }
}
