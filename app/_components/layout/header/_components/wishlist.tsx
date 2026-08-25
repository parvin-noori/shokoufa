"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { UserType } from "../_type/user.type";

type WishlistProps = {
  user: UserType | undefined;
};

export default function Wishlist({ user }: WishlistProps) {
  return (
    <Link
      href={user ? "/whishlist" : "/login"}
      className="border border-gray-200 p-4 rounded-full cursor-pointer hover:border-black transition-color duration-300"
    >
      <Heart />
    </Link>
  );
}
