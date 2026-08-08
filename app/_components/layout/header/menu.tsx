"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CategoryItem } from "../../categories/category.types";

type MenuProps = {
  items: CategoryItem[];
};

export default function Menu({ items }: MenuProps) {
  const mainMenu: CategoryItem[] = [
    {
      title: "دسته بندی ها",
      slug: "/categories",
      static: true,
    },
    ...items.map((item) => ({
      title: item.title,
      slug: `/categories?occasion=${item.slug}`,
    })),
  ];
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const occasion = searchParams.get("occasion");

  const currentFullPath = occasion
    ? `${pathName}?occasion=${occasion}`
    : pathName;
  return (
    <ul className="flex items-center justify-between">
      {mainMenu.map((item, index) => {
        const isActive = item.static
          ? pathName === item.slug && !occasion
          : item.slug === currentFullPath;
        return (
          <li key={index} className="flex items-center gap-x-2">
            {index === 0 && <MenuIcon />}
            <Link
              href={item.slug}
              className={`hover:text-rose-500 transition-all duration-100 ${isActive ? "text-rose-500" : "text-gray-800"}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
