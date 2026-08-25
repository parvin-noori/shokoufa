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
      slug: `/categories?category=${item.slug}`,
    })),
  ];
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const currentFullPath = category
    ? `${pathName}?category=${category}`
    : pathName;
  return (
    <ul className="lg:flex lg:items-center xl:col-span-1 lg:col-span-2 lg:justify-between flex-col lg:flex-row divide-y lg:divide-transparent divide-gray-200">
      {mainMenu.map((item, index) => {
        const isActive = item.static
          ? pathName === item.slug && !category
          : item.slug === currentFullPath;
        return (
          <li key={index} className="flex items-center gap-x-2">
            {index === 0 && <MenuIcon className="lg:flex hidden"/>}
            <Link
              href={item.slug}
              className={`hover:text-rose-500 lg:p-0 p-5 transition-all duration-100 ${isActive ? "text-rose-500" : "text-gray-800"}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
