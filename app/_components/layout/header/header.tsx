"use clinet";
import {
  ChevronDown,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";

const mainMenu = [
  {
    text: "دسته بندی ها",
    link: "/",
  },
  {
    text: "دسته گل",
    link: "/",
  },
  {
    text: "باکس گل",
    link: "/",
  },
  {
    text: "تبریک",
    link: "/",
  },
  {
    text: "تسلیت",
    link: "/",
  },
  {
    text: "روز دختر",
    link: "/",
  },
  {
    text: "ارسال امروز",
    link: "/",
  },
];

export default function Header() {
  return (
    <header>
      <div className="container">
        {/* top header  */}
        <div className="top-header py-5 grid grid-cols-2 items-center">
          {/* right  */}
          <div className="flex items-center gap-x-5">
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
              <button type="submit" className="p-4 cursor-pointer">
                <Search />
              </button>
              <input
                type="text"
                placeholder="جستجوی گل در شکوفا"
                className="outline-none"
              />
            </Form>
          </div>

          {/* left  */}
          <div className="flex items-center gap-x-2 justify-end">
            <button
              type="button"
              className="border border-gray-200 p-4 rounded-full cursor-pointer"
            >
              <Heart />
            </button>
            <button
              type="button"
              className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2"
            >
              <div className="badge bg-rose-50 rounded-full text-rose-500 px-2">
                2
              </div>
              <ShoppingCart />
            </button>
            <button
              type="button"
              className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2"
            >
              <UserRound />
              سروش
              <ChevronDown />
            </button>
          </div>
        </div>

        {/* bottom header  */}
        <div className="bottom-header py-2 grid grid-cols-2 items-center">
          {/* right  */}
          <ul className="flex items-center justify-between">
            {mainMenu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="hover:text-rose-500 transition-all duration-100"
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* left  */}
          <div className="flex items-center gap-x-2 justify-end text-sm">
            <p>ارسال به :</p>
            <button
              type="button"
              className="bg-gray-100 text-gray-600 p-1 rounded-full cursor-pointer flex items-center gap-x-2"
            >
              البرز٬ کرج
              <ChevronDown size={16}/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
