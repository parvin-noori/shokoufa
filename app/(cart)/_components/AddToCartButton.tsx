"use client";

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
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleAddToCart = async () => {
    try {
      setIsSubmitting(true);
      const result = await AddToCart(productId);

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
        <div className="flex items-center">
          <button
            onClick={handleAddToCart}
            disabled={isSubmitting}
            type="button"
            className="bg-rose-500 justify-center text-white  size-8 rounded-lg cursor-pointer hover:contrast-90 flex items-center"
          >
            <Plus />
          </button>
          <input
            type="text"
            value={currentQuantity}
            className="text-center w-16 text-xl"
            readOnly
          />
          <button
            onClick={handleDecrease}
            disabled={isSubmitting}
            type="button"
            className="bg-rose-500 justify-center text-white  size-8 rounded-lg cursor-pointer hover:contrast-90 flex items-center"
          >
            <Minus />
          </button>
        </div>
      )}
    </>
  );
}
