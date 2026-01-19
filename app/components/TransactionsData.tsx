"use client";
import { useEffect, useState } from "react";
import { getSignatures } from "../lib/history";
import { ConfirmedSignatureInfo } from "@solana/web3.js";

type SignatureProps = {
  signature: string;
  slot: string;
  blockTime: number;
  confirmationStatus: string;
};

export default function TransactionsData() {
  const [signatures, setSignatures] = useState<ConfirmedSignatureInfo[]>([]);
  const [userPubKey, setUserPubKey] = useState<string | undefined>();

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    console.log("keys", wallet);

    if (wallet) {
      const parsed = JSON.parse(wallet);
      setUserPubKey(parsed.publicKey);
    }
    async function fetchData() {
      if (!userPubKey) return;
      const result = await getSignatures(userPubKey);
      if (!result) return;
      const data: ConfirmedSignatureInfo[] = result;
      setSignatures(data);
    }
    fetchData();
  }, [userPubKey]);

  return (
    <div className="w-full overflow-x-auto rounded-md border border-neutral-400/20 mt-8">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-neutral-800">
          <tr>
            <th className="px-6 py-3">Signature</th>
            <th className="px-6 py-3">Slot</th>
            <th className="px-6 py-3">Time</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Details</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {signatures.map((sig: ConfirmedSignatureInfo) => (
            <tr key={sig.signature} className="hover:bg-neutral-800/40">
              <td className="px-6 py-1.5 md:py-4">
                {sig.signature.slice(0, 8)}...{sig.signature.slice(-8)}
              </td>

              <td>{sig.slot.toLocaleString()}</td>

              <td className="px-6 py-1.5 md:py-4">
                {sig.blockTime &&
                  new Date(sig.blockTime * 1000).toLocaleString()}
              </td>

              <td className="px-6 py-1.5 md:py-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    sig.confirmationStatus === "finalized"
                      ? "bg-green-400 text-black"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {sig.confirmationStatus}
                </span>
              </td>

              <td className="px-6 py-1.5 md:py-4 text-right">
                <a
                  href={`https://explorer.solana.com/tx/${sig.signature}?cluster=devnet`}
                  target="_blank"
                  className="font-medium hover:underline text-blue-500"
                >
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
