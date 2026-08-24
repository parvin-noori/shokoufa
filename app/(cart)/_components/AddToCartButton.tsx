"use client";

import { useProductOptions } from "@/app/(products)/products/[slug]/ProductOptionsProvider";
import { AddToCart, DecreaseFromCart } from "@/app/lib/cart-actions";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type AddToCartButtonProps = {
  productId: string;
  quantity: number;
};

export default function AddToCartButton({
  productId,
  quantity,
}: AddToCartButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
   const {
    selectedSize,
    selectedColors,
  } = useProductOptions();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleAddToCart = async () => {
    try {
      setIsSubmitting(true);
      if (!selectedSize) {
        toast.warning("لطفاً سایز را انتخاب کنید");
        return;
      }

      if (selectedColors.length === 0) {
        toast.warning("لطفاً حداقل یک رنگ انتخاب کنید");
        return;
      }
      const result = await AddToCart(productId, selectedSize, selectedColors);

      if (result?.error) {
        toast.error(result.error);
        return;
      }
      if (result.quantity !== undefined) {
        setCurrentQuantity(result.quantity);
      }

      toast.success(result.success);
    } catch (error) {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecrease = async () => {
    try {
      setIsSubmitting(true);

      const result = await DecreaseFromCart(productId);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.quantity !== undefined) {
        setCurrentQuantity(result.quantity);
      }

      toast.success(result.success);
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {currentQuantity === 0 ? (
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSubmitting}
          className="bg-rose-500 justify-center text-white w-full p-3 rounded-xl cursor-pointer hover:contrast-90 flex items-center gap-x-3 disabled:cursor-none disabled:contrast-50"
        >
          <ShoppingCart />
          {isSubmitting ? "در حال افزودن..." : "افزودن به سبد خرید"}
        </button>
      ) : (
        <div className="flex items-strach gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isSubmitting}
            type="button"
            className="bg-white shadow-sm border border-gray-200 justify-center text-gray-800  size-10 rounded-xl cursor-pointer hover:contrast-90 flex items-center"
          >
            <Plus className="text-gray-800" />
          </button>
          <input
            type="text"
            value={currentQuantity}
            className="text-center w-12 text-xl border border-gray-200 bg-gray-50 rounded-xl"
            readOnly
          />
          <button
            onClick={handleDecrease}
            disabled={isSubmitting}
            type="button"
            className="bg-white shadow-sm border border-gray-200 justify-center text-gray-800  size-10 rounded-xl cursor-pointer hover:contrast-90 flex items-center"
          >
            <Minus />
          </button>
        </div>
      )}
    </>
  );
}
