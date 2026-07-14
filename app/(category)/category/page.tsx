"use client";

import Product from "@/app/_components/products/product";
import { getFilters, getProducts } from "@/app/lib/api/getProducts";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Category() {
  const filterList = [
    {
      value: "",
      label: "کمترین قیمت",
    },
    {
      value: "",
      label: "بیشترین قیمت",
    },
    {
      value: "",
      label: "پرفروش ترین",
    },
    {
      value: "",
      label: "جدیدترین",
    },
    {
      value: "",
      label: "بیشترین تخفیف",
    },
    {
      value: "",
      label: "ارسال امروز",
    },
  ];

  const products = getProducts();
  const filters = getFilters();

  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filtersTitle: Record<string, string> = {
    flowerType: "نوع گل",
    occasion: "مناسبت",
    style: "استایل",
    size: "اندازه",
    priceRange: "قیمت",
    colors: "رنگ ها",
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-500 py-4">
          <span>خانه</span>
          <ChevronLeft size={20} />
          <Link href="/category" className="text-rose-500">
            دسته بندی
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 gap-x-5">
          <div className="lg:col-span-1 lg:block hidden">
            <div className="px-5 shadow-[0_0_24px_rgba(0,0,0,0.05)] border border-gray-200 rounded-xl divide-y divide-gray-100">
              {Object.keys(filters).map((key, index) => {
                if (key === "priceRange") return null;

                return (
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleIndex(index)}
                      className="flex cursor-pointer py-5 items-center text-gray-800 justify-between"
                    >
                      {filtersTitle[key]}
                      {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openIndex === index
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {filters[key].map((opt) => (
                          <li key={opt.value} className="py-2">
                            <label
                              key={opt.value}
                              className="text-gray-600 flex items-center justify-between"
                            >
                              {opt.label}
                              <input type="checkbox" value={opt.value} />
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-y-3 gap-y-5">
            <div className="lg:flex hidden bg-gray-100 items-center justify-between px-5 rounded-full justify-between">
              <ul className="flex items-center gap-x-2">
                {filters.sortOptions.map((item, index) => (
                  <li className="p-3" key={index}>
                    {item.label}
                  </li>
                ))}
              </ul>
              <span className="text-gray-600">64 کالا</span>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
              {products.map((product, index) => (
                <Product key={index} product={product} isOffer={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
