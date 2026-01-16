import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
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

export default async function distributeTokens(userPublicKey: string) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const userPubkey = new PublicKey(userPublicKey);
  const mintAddress = new PublicKey(
    "4Ej9XcTahC3i3o9H42Sv7ymmR8Si5QcsfnBrL9yGhM9A"
  );

  const adminSecret = [
    130, 84, 163, 40, 106, 162, 143, 196, 129, 86, 44, 50, 183, 108, 119, 132,
    191, 47, 180, 238, 220, 53, 18, 236, 216, 22, 23, 128, 23, 223, 152, 123,
    69, 76, 211, 169, 222, 119, 11, 215, 217, 113, 82, 45, 161, 30, 210, 33, 31,
    47, 136, 153, 127, 32, 232, 102, 172, 0, 133, 91, 59, 171, 127, 203,
  ];

  const admin = Keypair.fromSecretKey(Uint8Array.from(adminSecret));
  const amount = BigInt(10) * BigInt(10 ** 9);

  const adminTokenAccount = await getAssociatedTokenAddress(
    mintAddress,
    admin.publicKey,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    admin,
    mintAddress,
    userPubkey,
    false,
    "confirmed",
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  const transferInstruction = await createTransferInstruction(
    adminTokenAccount,
    userTokenAccount.address,
    admin.publicKey,
    amount,
    [],
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(transferInstruction);
  return await sendAndConfirmTransaction(connection, tx, [admin]);
}
