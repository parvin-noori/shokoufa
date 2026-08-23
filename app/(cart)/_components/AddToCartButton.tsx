"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

type AddToCartButtonProps = {
  productId: string;
  stock:number
};

export default function AddToCartButton({ productId,stock }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      type="button"
      onClick={() => addToCart(productId, stock)}
      className="bg-rose-500 justify-center text-white w-full p-3 rounded-xl cursor-pointer hover:contrast-90 flex items-center gap-x-3"
    >
      <ShoppingCart />
      افزودن به سبد خرید
    </button>
  );
}
