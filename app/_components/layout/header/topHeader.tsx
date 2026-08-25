import Image from "next/image";
import CartButton from "./_components/cart";
import LoginButton from "./_components/loginButton";
import SearchForm from "./_components/searchForm";
import Wishlist from "./_components/wishlist";
import { CategoryType } from "./_type/category.type";
import { UserType } from "./_type/user.type";
import HamburgerMenu from "./hamburgerMenu";
import Link from "next/link";

type TopHeaderProps = {
  user?: UserType;
  cartQuantity: number;
  categories: CategoryType[];
};

export default function TopHeader({
  user,
  cartQuantity,
  categories,
}: TopHeaderProps) {
  return (
    <div className="top-header py-5 grid lg:grid-cols-2 grid-cols-1 items-center">
      {/* right  */}
      <div className="flex items-center gap-x-3">
        <HamburgerMenu categories={categories} />
        <Link href="/">
        <Image src="/images/BrandLogo.png" alt="لوگو" width={105} height={32} />
        </Link>
        <SearchForm />
      </div>

      {/* left  */}
      {user && (
        <div className="lg:flex hidden items-center gap-x-2 justify-end">
          {/* wish list  */}
          <Wishlist user={user} />

          {/* cart */}
          <CartButton user={user} cartQuantity={cartQuantity} />

          {/* login  */}
          <LoginButton user={user} />
        </div>
      )}
    </div>
  );
}
