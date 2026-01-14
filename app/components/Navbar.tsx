import Image from "next/image";
import coin from "../../public/coin.png";
import { LayoutDashboard, Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 md:py-4">
      <div className="flex gap-2 items-center ">
        <Image src={coin} alt="coin" className="w-15" />
        <div className="flex flex-col justify-center ">
          <h1 className="font-bold">
            100x <span className="text-green-500">Devs</span>
          </h1>
          <h1 className="font-medium text-xs ">KIRAT</h1>
        </div>
      </div>

      <div className="hidden md:flex gap-8">
        <a
          href="/"
          className="flex gap-2 text-[14px] text-green-500 items-center font-bold"
        >
          <LayoutDashboard className="w-4" />
          Dashboard
        </a>

        <a
          href="/wallet"
          className="flex gap-2 text-[14px] transition-colors hover:text-green-500 items-center font-bold"
        >
          <Wallet className="w-4" />
          Create Wallet
        </a>
      </div>

      <div>
        <button className="bg-green-700 hover:bg-green-500 px-4 md:px-6 py-2 rounded-md text-black text-xs md:text-sm font-mono font-bold tracking-wide">
          Create Wallet
        </button>
      </div>
    </div>
  );
}
