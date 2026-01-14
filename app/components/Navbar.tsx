"use client";
import Image from "next/image";
import { LayoutDashboard, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  const routes = [
    { id: 1, link: "/", label: "Dashboard", icon: LayoutDashboard },
    { id: 2, link: "/wallet", label: "Create Wallet", icon: Wallet },
  ];

  return (
    <nav className="flex items-center justify-between py-2 md:py-4">
      <div className="flex gap-2 items-center ">
        <img src="/coin.png" alt="coin" className="w-12 h-12 md:w-15 md:h-15" />
        <div className="flex flex-col justify-center ">
          <h1 className="font-bold text-sm md:text-[18px]">
            100x <span className="text-green-500">Devs</span>
          </h1>
          <h1 className="font-medium text-xs">KIRAT</h1>
        </div>
      </div>

      <div className="hidden md:flex gap-8">
        {routes.map(({ id, label, link, icon: Icon }) => (
          <a
            key={id}
            href={link}
            className={`flex gap-2 text-[14px]  items-center font-bold hover:text-green-500 ${
              pathName == link ? "text-green-500" : "text-white"
            }`}
          >
            <Icon size={18} />
            {label}
          </a>
        ))}
      </div>

      <div>
        <button className="bg-green-700 hover:bg-green-500 px-2 md:px-6 py-2 rounded-md text-black text-xs md:text-sm font-mono font-bold tracking-wide">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
