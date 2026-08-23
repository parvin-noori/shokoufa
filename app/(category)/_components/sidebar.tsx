"use client";
import { CategoryItem } from "@/app/_components/categories/category.types";
import { Color, FlowerType, Size, Style } from "@/app/generated/prisma/enums";
import {
  colorLabels,
  colorStyleMap,
  flowerTypeLabels,
  sizeLabels,
  styleLabels,
} from "@/app/lib/labels";
import {
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SortBar from "./sortBar";

export function getFilters(categories: CategoryItem[]) {
  return {
    flowerType: Object.values(FlowerType).map((v) => ({
      value: v,
      label: flowerTypeLabels[v],
    })),
    // occasion: Object.values(Occasion).map((v) => ({
    //   value: v,
    //   label: occasionLabels[v],
    // })),
    category: categories.map((c) => ({
      value: c.slug,
      label: c.title,
    })),
    size: Object.values(Size).map((v) => ({
      value: v,
      label: sizeLabels[v],
    })),
    style: Object.values(Style).map((v) => ({
      value: v,
      label: styleLabels[v],
    })),
    colors: Object.values(Color).map((v) => ({
      value: v,
      label: colorLabels[v],
    })),
  };
}

const filtersTitle: Record<string, string> = {
  flowerType: "نوع گل",
  occasion: "مناسبت",
  style: "استایل",
  size: "اندازه",
  priceRange: "قیمت",
  colors: "رنگ ها",
  category: "دسته بندی",
};



export default function Sidebar({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const filters = getFilters(categories);

  const filterKeys = Object.keys(filters) as (keyof typeof filters)[];
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    filterKeys.map((_, index) => index),
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialFilters = (): SelectedFilters => {
    const initial: SelectedFilters = {};
    filterKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        initial[key] = value.split(",");
      }
    });
    return initial;
  };

  type SelectedFilters = Record<string, string[]>;
  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>(getInitialFilters());

  useEffect(() => {
    setSelectedFilters(getInitialFilters());
  }, [searchParams]);

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
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    try {
      Object.entries(selectedFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          params.set(key, values.join(","));
        }
      });

      router.push(`${pathname}?${params.toString()}`);
      setShowDrawer(false);
    } catch (error) {
      console.error("خطا در ذخیره‌سازی localStorage:", error);
    }
  };

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 divide-x divide-gray-300 gap-x-5 p-2 lg:hidden my-5 bg-gray-100 rounded-full">
        <button
          className="cursor-pointer flex items-center justify-center gap-x-2 p-1 w-full"
          onClick={() => setShowDrawer(true)}
        >
          <span>فیلتر</span>
          <SlidersHorizontal size={20} />
        </button>
        <SortBar />
      </div>
      <div
        className={`lg:col-span-1 lg:relative fixed inset-0 bg-white lg:z-10 z-100 transform transition duration-200 ${showDrawer ? "lg:translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
        <header className="lg:hidden flex items-center justify-between p-2 shadow-sm">
          <span className="font-semibold">فیلترها</span>
          <button
            className="cursor-pointer p-3"
            type="button"
            onClick={() => setShowDrawer(false)}
          >
            <X />
          </button>
        </header>
        <form
          onSubmit={handleSubmit}
          className="p-2 lg:shadow-[0_0_24px_rgba(0,0,0,0.05)] lg:border border-gray-200 lg:rounded-2xl divide-y divide-gray-100  overflow-auto h-[90%] lg:h-auto lg:overflow-none"
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
                                  checked={
                                    selectedFilters[key]?.includes(opt.value) ??
                                    false
                                  }
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
                                  checked={
                                    selectedFilters[key]?.includes(opt.value) ??
                                    false
                                  }
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
    </>
  );
}
