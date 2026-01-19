import Wallet from "../components/Wallet";
import TransactionsData from "../components/TransactionsData";

export default function Page() {
  return (
    <section className="mt-4 mb-8 max-w-4xl mx-auto">
      <h1 className="text-xs md:text-base font-medium text-gray-300 text-center mb-4 tracking-[1.5px]">
        create a wallet and get 2 100x Devs coins.
      </h1>
      <div className="flex flex-col md:flex-row gap-2 border border-white/20 p-3 overflow-x-hidden overflow-y-auto">
        <div className="w-full md:pr-2">
          <Wallet />
        </div>
      </div>
      <div className="">
        <TransactionsData />
      </div>
    </section>
  );
}
