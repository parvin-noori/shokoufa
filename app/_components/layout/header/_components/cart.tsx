"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserType } from "../_type/user.type";

type CartButtonProps = {
  user: UserType|undefined;
  cartQuantity: number;
};

export default function CartButton({ user, cartQuantity }: CartButtonProps) {
  const [quantity, setQuantity] = useState(cartQuantity);

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  return (
    <Link
      href={user ? "/cart" : "/login"}
      className="border border-gray-200 p-4 rounded-full cursor-pointer flex items-center gap-x-2 hover:border-black transition-color duration-300"
    >
      {user && (
        <div className="badge bg-rose-50 rounded-full text-rose-500 px-2">
          {quantity}
        </div>
      )}
      <ShoppingCart />
    </Link>
  );
}
