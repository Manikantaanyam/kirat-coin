import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function getKiratBalance(publicKey: string): Promise<number> {
  const walletPublicKey = new PublicKey(publicKey);

  const mintAddress = new PublicKey(process.env.MINT_ADDRESS as string);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    walletPublicKey,
    {
      mint: mintAddress,
    }
  );
  console.log("token", tokenAccounts);

  if (tokenAccounts.value.length === 0) {
    return 0;
  }

  const tokenInfo = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
  console.log("token", tokenInfo);

  return Number(tokenInfo.amount) / 10 ** tokenInfo.decimals;
}
