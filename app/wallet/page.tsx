import Image from "next/image";
import Wallet from "../components/Wallet";

export default function Page() {
  return (
    <section className="mt-4 mb-8">
      <h1 className="text-xs md:text-base font-medium text-gray-300 text-center mb-4 tracking-[1.5px]">
        subscribe to the channel and get 2 kirat coins to test it out.
      </h1>
      <div className="flex flex-col md:flex-row gap-2 border border-white/20 p-3 overflow-y-auto">
        <div className="flex-1 md:border-r border-r-gray-400/40">
          <Wallet />
        </div>
        <div className="flex flex-col items-center">
          <Image src="/coin.png" width={300} height={300} alt="coin" />
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col items-center">
              <h1 className="font-bold">100x Devs Coin</h1>
              <p className="text-gray-400 text-xs">
                1 coin = 1000000000 kirats
              </p>
            </div>

            <p className="max-w-xs mx-auto text-center text-gray-400 text-xs">
              This website is for educational purpose and this kirat coin
              doesn't have any monetary value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
