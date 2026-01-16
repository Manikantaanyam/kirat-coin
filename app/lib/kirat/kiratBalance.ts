import {
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export default async function getKiratBalance(publicKey: string) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const publickey = new PublicKey(publicKey);
  const mintAddress = new PublicKey(
    "4Ej9XcTahC3i3o9H42Sv7ymmR8Si5QcsfnBrL9yGhM9A"
  );

  const ata = await getAssociatedTokenAddress(
    mintAddress,
    publickey,
    undefined,
    TOKEN_2022_PROGRAM_ID
  );

  try {
    const account = await getAccount(
      connection,
      ata,
      "confirmed",
      TOKEN_2022_PROGRAM_ID
    );

    console.log(Number(account.amount) / 10 ** 9);
    console.log(account.address);
    return Number(account.amount) / 10 ** 9;
  } catch (e) {
    if (
      e instanceof TokenAccountNotFoundError ||
      e instanceof TokenInvalidAccountOwnerError
    ) {
      return 0;
    }
  }
}
