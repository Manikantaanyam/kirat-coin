"use client";
import getSupply from "./lib/supply";

export default function Home() {
  return (
    <div className="">
      <button
        onClick={async () => {
          console.log(await getSupply());
        }}
      >
        get supply
      </button>
    </div>
  );
}
