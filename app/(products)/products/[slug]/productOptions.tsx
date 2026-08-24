"use client";

import { Color, Size } from "@/app/generated/prisma/enums";
import {
  colorLabels,
  colorStyleMap,
  sizeLabels,
} from "@/app/lib/labels";

import { useProductOptions } from "./ProductOptionsProvider";

type ProductOptionsProps = {
  sizes: Size[];
  colors: Color[];
};

export default function ProductOptions({
  sizes,
  colors,
}: ProductOptionsProps) {
  const {
    selectedSize,
    selectedColors,
    setSelectedSize,
    toggleColor,
  } = useProductOptions();

  return (
    <div className="flex flex-col gap-6">
      {/* Size */}
      <div className="grid grid-cols-8 gap-x-4 items-center">
        <span className="text-lg col-span-1">
          اندازه
        </span>

        <div className="flex items-center gap-x-2 col-span-7">
          {sizes.map((size) => (
            <label
              key={size}
              className="cursor-pointer"
            >
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className="peer sr-only"
              />

              <span className="block text-gray-800 rounded-full bg-gray-200 px-8 py-3 transition peer-checked:bg-rose-50 peer-checked:text-rose-500">
                {sizeLabels[size]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-8 items-center gap-x-4">
        <span className="text-lg">
          رنگ
        </span>

        <div className="flex items-center gap-x-2 col-span-7 flex-wrap">
          {colors.map((color) => {
            const selected =
              selectedColors.includes(color);

            return (
              <label
                key={color}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={color}
                  checked={selected}
                  onChange={() => toggleColor(color)}
                  className="peer sr-only"
                />

                <span
                  className={`block rounded-full px-8 py-3 flex items-center gap-x-2 transition ${
                    selected
                      ? "bg-rose-50 text-rose-500"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <span>
                    {colorLabels[color]}
                  </span>

                  <span
                    className={`size-4.5 rounded ${
                      colorStyleMap[color]?.dot
                    }`}
                  />
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}