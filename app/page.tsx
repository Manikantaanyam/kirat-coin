"use client";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import transfer100xDevs from "./lib/kirat/transferKirat";
import SendModal from "./components/sendModal";

export default function Home() {
  return (
    <div className="">
      <button
        onClick={async () => {
          const privateKeyString =
            "4c1XwG8QDMNFNC25YBmDeURZV8hgREjfjNyxibxrt3chJzh1j9uxYEL94btBj8ByAAncvMST9zweu72ceXgUSvqx";
          const userKeypair = Keypair.fromSecretKey(
            bs58.decode(privateKeyString)
          );
          const data = await transfer100xDevs(
            // "44xD2MDAf813fJQcJMMaftRopBgdWFjtkg3P7LXDKhpD8FNdCyvYp1f4GHuH63dq73f196dBvBqqe13GoV8Fh7fF",
            userKeypair,
            "8sU87BPWDnWLmaxGGUv9NKGWASvtCySNDSGAxPcBkiZx",
            "1.00000067"
          );

          console.log("data", data);
        }}
      >
        get supply
      </button>

      <SendModal />
    </div>
  );
}
