import Image from "next/image";
import Wallet from "../components/Wallet";

export default function Page() {
  return (
    <section className="mt-4 mb-8">
      <h1 className="text-xs md:text-base font-medium text-gray-300 text-center mb-4 tracking-[1.5px]">
        subscribe to the channel and get 2 100x Devs coins.
      </h1>
      <div className="flex flex-col md:flex-row gap-2 border border-white/20 p-3 overflow-x-hidden overflow-y-auto">
        <div className="flex-1 md:border-r border-r-gray-400/40 md:pr-2">
          <Wallet />
        </div>
        <div className="flex flex-col items-center justify-center shrink-0 min-w-25">
          <Image src="/coin.png" width={300} height={300} alt="coin" />
          <button className="px-4 py-1.5 rounded-md mb-2 cursor-pointer bg-linear-to-r from-green-700 to-green-600 text-black font-semibold">
            subscribe
          </button>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-col items-center">
              <h1 className="font-bold">100x Devs Coin</h1>
              <p className="text-gray-400 text-xs">
                1 coin = 1000000000 kirats
              </p>
            </div>

            <p className="max-w-xs mx-auto text-center text-gray-400 text-xs">
              This website is for educational purpose and this 100x Devs coin
              doesn't have any monetary value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
