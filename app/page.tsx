"use client";
import getTransactionHistory from "./lib/history";

export default function Home() {
  return (
    <div className="">
      <button
        onClick={() =>
          getTransactionHistory("DkXNbQPRCg8kkwR6tDJroBeVDUAZw6aM2UaiNNqXma21")
        }
      >
        signa
      </button>
    </div>
  );
}
