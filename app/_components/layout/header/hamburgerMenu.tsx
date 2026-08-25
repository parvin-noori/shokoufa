"use client";
import { Menu as MainMenu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryType } from "./_type/category.type";
import Menu from "./menu";

type HamburgerMenuProps = {
  categories: CategoryType[];
};

export default function HamburgerMenu({ categories }: HamburgerMenuProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpened ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpened(true)}
        className="text-gray-800 cursor-pointer lg:hidden flex group"
      >
        <MainMenu />
      </button>
      <div
        className={`hamburgerMenu overflow-y-auto transition-transform duration-300 bg-white fixed inset-0  z-100 ${isOpened ? "" : "translate-x-full"}`}
      >
        <button
          type="button"
          className="absolute end-5 top-10 cursor-pointer"
          onClick={() => setIsOpened(false)}
        >
          <X />
        </button>
        <ul className="flex flex-col divide-y divide-gray-200 text-start py-22 px-5">
          <Menu items={categories} />
        </ul>
      </div>
    </div>
  );
}
