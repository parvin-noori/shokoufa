"use client";

import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type TopHeaderProps = {
  user?: {
    name?: string | null;
    email?: string | null;
    password?: string | null;
  };
};

export default function TopHeader({ user }: TopHeaderProps) {
  return (
    <div className="top-header py-5 grid lg:grid-cols-2 grid-cols-1 items-center">
      {/* right  */}
      <div className="flex items-center gap-x-3">
        <HamburgerMenu />
        <Link href="/">
          <Image
            src="/images/BrandLogo.png"
            alt="لوگو"
            width={105}
            height={32}
          />
        </Link>
        <Form
          action=""
          className="searchbar flex items-center bg-gray-100 text-gray-400 rounded-full overflow-hidden text-sm flex-grow"
        >
          <button type="submit" className="lg:p-4 p-3 cursor-pointer">
            <Search />
          </button>
          <input
            type="text"
            placeholder="جستجوی گل در شکوفا"
            className="outline-none w-full lg:py-4 py-3"
          />
        </Form>
      </div>

      {/* left  */}
      <div className="lg:flex hidden items-center gap-x-2 justify-end">
        <button
          type="button"
          className="border border-gray-200 p-4 rounded-full cursor-pointer hover:border-black transition-color duration-300"
        >
          <Heart />
        </button>
        <button
          type="button"
          className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2 hover:border-black transition-color duration-300"
        >
          <div className="badge bg-rose-50 rounded-full text-rose-500 px-2">
            2
          </div>
          <ShoppingCart />
        </button>
        <button
          type="button"
          className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2 hover:border-black transition-color duration-300"
        >
          <UserRound />
          {user?.name}
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}

function HamburgerMenu() {
  const [isOpened, setIsOpened] = useState(false);
  const pathName = usePathname();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpened(true)}
        className="text-gray-800 cursor-pointer lg:hidden flex group"
      >
        <Menu />
      </button>
      <div
        className={`hamburgerMenu transition-transform duration-300 bg-white fixed inset-0  z-10 ${isOpened ? "" : "translate-x-full"}`}
      >
        <button
          type="button"
          className="absolute end-5 top-10 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          <X />
        </button>
        <ul className="flex flex-col divide-y divide-gray-200 text-start py-22 px-5">
          {/* {mainMenu.map((item, index) => {
            const isActive = item.href === pathName;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`p-5 block transition-all duration-100 ${isActive ? "text-rose-500" : "text-gray-800 "}`}
                >
                  {item.text}
                </Link>
              </li>
            );
          })} */}
        </ul>
      </div>
    </div>
  );
}
