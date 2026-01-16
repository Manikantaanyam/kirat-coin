import { Keypair } from "@solana/web3.js";
import { Send, X } from "lucide-react";
import bs58 from "bs58";
import transfer100xDevs from "../lib/kirat/transferKirat";
import { useState } from "react";

type Props = {
  onClose: () => void;
  secretKey: string;
};

export default function SendModal({ onClose, secretKey }: Props) {
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const keypair = Keypair.fromSecretKey(bs58.decode(secretKey));

  async function sendTokens() {
    try {
      setLoading(true);
      const data = await transfer100xDevs(keypair, destinationAddress, amount);
      console.log("data", data);
      setLoading(false);
    } catch (e) {
      setError(true);
      console.log("Error while transferring", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-900 p-6 rounded-xl w-95 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Send KIRAT</h1>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <img src="/coin.png" className="w-16 h-16 mx-auto" />

      <input
        placeholder="Receiver address"
        className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
        onChange={(e) => setDestinationAddress(e.target.value)}
      />

      <input
        placeholder="Amount"
        className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={sendTokens}
        disabled={loading}
        className={`w-full py-2 rounded-md flex items-center justify-center gap-2
    ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-white cursor-pointer"}
    text-black transition`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send size={16} />
            <span>Send</span>
          </>
        )}
      </button>
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 space-y-1">
          <p className="text-center text-red-500 font-semibold">
            Transaction failed
          </p>
          <p className="text-xs text-center text-red-400">
            Please check that you have sufficient SOL and KIRAT balance, and
            that the receiver address is correct.
          </p>
        </div>
      )}
    </div>
  );
}
