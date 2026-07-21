"use client";

import Product from "@/app/_components/products/product";
import { getFilters, getProducts } from "@/app/lib/api/getProducts";
import { Check, ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Category() {
  const filterList = [
    { value: "", label: "کمترین قیمت" },
    { value: "", label: "بیشترین قیمت" },
    { value: "", label: "پرفروش ترین" },
    { value: "", label: "جدیدترین" },
    { value: "", label: "بیشترین تخفیف" },
    { value: "", label: "ارسال امروز" },
  ];

  const products = getProducts();
  const filters = getFilters();

  type SelectedFilters = Record<string, string[]>;

  const filterKeys = Object.keys(filters).filter(
    (key) => key !== "priceRange" && key !== "sortOptions",
  ) as Exclude<keyof typeof filters, "priceRange" | "sortOptions">[];

  const [openIndexes, setOpenIndexes] = useState<number[]>(
    filterKeys.map((_, index) => index),
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const filtersTitle: Record<string, string> = {
    flowerType: "نوع گل",
    occasion: "مناسبت",
    style: "استایل",
    size: "اندازه",
    priceRange: "قیمت",
    colors: "رنگ ها",
  };

  const colorStyleMap: Record<string, { dot: string; selectedBg: string }> = {
    pink: { dot: "bg-pink-500", selectedBg: "has-[:checked]:bg-pink-100" },
    white: {
      dot: "bg-white border border-gray-300",
      selectedBg: "has-[:checked]:bg-gray-100",
    },
    purple: {
      dot: "bg-purple-800",
      selectedBg: "has-[:checked]:bg-purple-100",
    },
    blue: { dot: "bg-blue-600", selectedBg: "has-[:checked]:bg-blue-100" },
    yellow: {
      dot: "bg-yellow-400",
      selectedBg: "has-[:checked]:bg-yellow-100",
    },
    turquoise: { dot: "bg-teal-600", selectedBg: "has-[:checked]:bg-teal-100" },
    red: { dot: "bg-red-500", selectedBg: "has-[:checked]:bg-red-100" },
    orange: {
      dot: "bg-orange-400",
      selectedBg: "has-[:checked]:bg-orange-100",
    },
    cream: { dot: "bg-orange-100", selectedBg: "has-[:checked]:bg-orange-50" },
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const handleCheckboxChange = (
    key: string,
    value: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[key] ?? [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      return {
        ...prev,
        [key]: newValues,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("فیلترهای انتخاب‌شده:", selectedFilters);
    try {
      localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
    } catch (error) {
      console.error("خطا در ذخیره‌سازی localStorage:", error);
    }
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
            <form
              onSubmit={handleSubmit}
              className="p-2 shadow-[0_0_24px_rgba(0,0,0,0.05)] border border-gray-200 rounded-2xl divide-y divide-gray-100"
            >
              {filterKeys.map((key, index) => {
                const options = filters[key];
                const isOpen = openIndexes.includes(index);

                return (
                  <div className="flex flex-col px-4" key={key}>
                    <button
                      type="button"
                      onClick={() => toggleIndex(index)}
                      className="flex cursor-pointer py-5 items-center text-gray-800 justify-between"
                    >
                      {filtersTitle[key]}
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul
                        className={`${key === "colors" ? "flex flex-wrap gap-2" : ""} overflow-hidden`}
                      >
                        {key === "colors"
                          ? options.map((opt) => {
                              const style = colorStyleMap[opt.value];
                              return (
                                <li key={opt.value}>
                                  <label
                                    className={`flex items-center border border-gray-200 rounded-full px-3 py-2 cursor-pointer transition-colors duration-200 ${style?.selectedBg ?? ""}`}
                                  >
                                    <span className="flex items-center gap-x-2 text-gray-600">
                                      <span
                                        className={`size-4 rounded-full inline-block ${style?.dot ?? "bg-gray-300"}`}
                                      />
                                      {opt.label}
                                    </span>
                                    <input
                                      type="checkbox"
                                      value={opt.value}
                                      className="hidden"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          key,
                                          opt.value,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                  </label>
                                </li>
                              );
                            })
                          : options.map((opt) => (
                              <li key={opt.value} className="py-2">
                                <label className="text-gray-600 flex items-center justify-between cursor-pointer">
                                  {opt.label}
                                  <span className="relative inline-flex items-center justify-center">
                                    <input
                                      type="checkbox"
                                      value={opt.value}
                                      className="peer appearance-none size-5 rounded border border-gray-300 checked:bg-rose-500 checked:border-rose-500 cursor-pointer transition-colors duration-200"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          key,
                                          opt.value,
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <Check
                                      size={13}
                                      strokeWidth={3}
                                      className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                    />
                                  </span>
                                </label>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
              <button
                type="submit"
                className="bg-rose-500 cursor-pointer w-full text-white  mt-5 rounded-full p-3"
              >
                فیلتر
              </button>
            </form>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-y-3 gap-y-5">
            <div className="lg:flex hidden bg-gray-100 items-center justify-between px-5 rounded-full justify-between">
              <ul className="flex items-center gap-x-2">
                {filters.sortOptions.map((item, index) => (
                  <li className="py-2" key={index}>
                    <button
                      type="button"
                      className="cursor-pointer bg-transparent hover:bg-rose-500 hover:text-white px-5 py-3 rounded-full transition duration-300"
                    >
                      {item.label}
                    </button>
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
