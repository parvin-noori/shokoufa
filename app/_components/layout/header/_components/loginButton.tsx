"use client";

import { logOut } from "@/app/lib/actions";
import {
  ChevronDown,
  ChevronLeft,
  LogIn,
  LogOut,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../_type/user.type";

export default function LoginButton({ user }: { user: UserType }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <>
      {user ? (
        <div className="relative">
          <button
            type="button"
            className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2 hover:border-black transition-color duration-300"
            onClick={handleDropDown}
          >
            <UserRound />
            {user?.name}
            <ChevronDown />
          </button>
          <ul
            className={`flex items-center flex-col  absolute gap-x-2  bg-white  border border-gray-200 rounded-xl end-0 w-64 divide-y mt-2 divide-gray-200 p-3 overflow-hidden ${showDropDown ? "flex" : "hidden"}`}
          >
            <li>
              <Link
                href="/"
                className="p-3 flex items-center justify-between gap-x-2 cursor-pointer group"
              >
                {user.email}
                <ChevronLeft className="group-hover:-translate-x-2 transition duration-200" />
              </Link>
            </li>
            <li>
              <button
                onClick={logOut}
                type="button"
                className="text-rose-500 p-3 flex items-center gap-x-2 cursor-pointer"
              >
                <LogOut size={20} />
                خروج
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          href="/login"
          className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2 hover:border-black transition-color duration-300"
        >
          <LogIn />
          ثبت نام | ورود
        </Link>
      )}
    </>
  );
}
