"use client";

import { Heart, House, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";

export default function NavigationBar() {
  const navigationMenus = [
    {
      title: "خانه",
      icon: <House />,
      href: "/",
    },
    {
      title: "سبد خرید",
      icon: <ShoppingCart />,
      href: "/cart",
    },
    {
      title: "علاقه مندی ها",
      icon: <Heart />,
      href: "/favorite",
    },
    {
      title: "پروفایل",
      icon: <User />,
      href: "/user",
    },
  ];

  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 bg-white inset-x-0 py-4 inset-shadow-sm lg:hidden flex z-90">
      <div className="container ">
        <ul className="flex items-center justify-between px-5 text-sm">
          {navigationMenus.map((item, index) => {
            const isActive = pathName === item.href;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex flex-col gap-y-2 items-center ${isActive ? "text-rose-500" : "text-gray-600"}`}
                >
                  <span
                    className={`px-6 py-2 rounded-full ${isActive ? "bg-rose-100" : ""}`}
                  >
                    {cloneElement(item.icon, {
                      className: isActive ? "fill-rose-500" : "text-gray-600",
                      size: 20,
                    })}
                  </span>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
