import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export default async function getSupply() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const mintAddress = new PublicKey(
    "4Ej9XcTahC3i3o9H42Sv7ymmR8Si5QcsfnBrL9yGhM9A"
  );

  let mintAccount = await getMint(
    connection,
    mintAddress,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  return mintAccount.supply;
}
