"use client";

import { Color, Size } from "@/app/generated/prisma/enums";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


type ProductOptionsContextType = {
  selectedSize: Size | null;
  selectedColors: Color[];
  setSelectedSize: (size: Size) => void;
  toggleColor: (color: Color) => void;
  removeColor: (color: Color) => void;
  resetOptions: () => void;
};

const ProductOptionsContext =
  createContext<ProductOptionsContextType | null>(null);

export function ProductOptionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const [selectedColors, setSelectedColors] = useState<Color[]>([]);

  const toggleColor = (color: Color) => {
    setSelectedColors((current) => {
      if (current.includes(color)) {
        return current.filter((item) => item !== color);
      }

      return [...current, color];
    });
  };

  const removeColor = (color: Color) => {
    setSelectedColors((current) =>
      current.filter((item) => item !== color),
    );
  };

  const resetOptions = () => {
    setSelectedSize(null);
    setSelectedColors([]);
  };

  return (
    <ProductOptionsContext.Provider
      value={{
        selectedSize,
        selectedColors,
        setSelectedSize,
        toggleColor,
        removeColor,
        resetOptions,
      }}
    >
      {children}
    </ProductOptionsContext.Provider>
  );
}

export function useProductOptions() {
  const context = useContext(ProductOptionsContext);

  if (!context) {
    throw new Error(
      "useProductOptions must be used inside ProductOptionsProvider",
    );
  }

  return context;
}