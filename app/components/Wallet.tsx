"use client";

import { useEffect, useState } from "react";
import generateMnemonics from "../lib/mneomic";
import SolonaWallet from "../lib/solana";
import { Eye, EyeOff } from "lucide-react";

type WalletData = {
  publicKey: string;
  secretKey: string;
};

export default function Wallet() {
  const [mnemonics, setMnemonics] = useState<string>("");
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  function getMnemonics() {
    const data = generateMnemonics();
    localStorage.setItem("mnemonics", data);
    setMnemonics(data);
  }

  function generateWallet() {
    const data = SolonaWallet(mnemonics);
    if (data) setWallet(data);
  }

  useEffect(() => {
    const data = localStorage.getItem("mnemonics");
    if (data) setMnemonics(data);
  }, []);

  return (
    <div>
      <div className="relative w-full flex flex-col cursor-pointer space-y-3 p-4 bg-[#121212b3] backdrop-blur-md">
        <button
          onClick={getMnemonics}
          disabled={mnemonics.length > 0}
          className={`px-3 text-sm md:px-6 py-2 bg-green-600 text-black rounded-md font-bold flex mx-auto cursor-pointer`}
        >
          Generate Seed
        </button>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-600/10 blur-[100px] rounded-full pointer-events-none" />

        {mnemonics ? (
          <div>
            <div className="grid grid-cols-3  lg:grid-cols-4 gap-3">
              {mnemonics.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="border border-slate-100/10  rounded-lg p-1 flex justify-center gap-2 overflow-hidden"
                >
                  <span className="font-medium truncate">{word}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between px-2 md:px-10">
                <h1 className="font-bold text-xs md:text-lg lg:text-xl">SOLANA WALLET</h1>
                <button
                  onClick={generateWallet}
                  className="bg-green-700 px-2 text-xs md:px-4 py-2 rounded-md text-black font-bold cursor-pointer"
                >
                  Add wallet
                </button>
              </div>

              {wallet ? (
                <div className="bg-neutral-900/80 p-4 mt-4 flex flex-col gap-2 overflow-y-scroll md:overflow-y-hidden">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">public key</h2>
                    <code className="text-xs ">{wallet?.publicKey}</code>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <h2 className="text-lg font-semibold">secret key</h2>
                      <button
                        onClick={() => setShowSecret((p) => !p)}
                        className="cursor-pointer"
                      >
                        {showSecret ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    {showSecret ? (
                      <code className="text-xs h-8">{wallet?.secretKey}</code>
                    ) : (
                      <p className="h-8">
                        ...............................................................
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-52 flex items-center justify-center ">
                  <p className="text-gray-600">
                    Add wallet with the help of seed phrase
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-80 flex items-center justify-center">
            <p className="text-center">
              In order to create a wallet generate a seed phrase first ..
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
