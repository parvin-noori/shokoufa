import { getCategories } from "@/app/lib/actions";
import { getCartQuantity } from "@/app/lib/cart-actions";
import { auth } from "@/auth";
import TopHeader from "./topHeader";
import BottomHeader from "./bottomHeader";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const categories = await getCategories();
  const cartQuantity = await getCartQuantity();

  return (
    <header className="shadow sticky top-0 bg-white z-20">
      <div className="container">
        {/* top header  */}
        <TopHeader
          user={user}
          cartQuantity={cartQuantity}
          categories={categories}
        />

        {/* bottom header  */}
        <BottomHeader categories={categories} />
      </div>
    </header>
  );
}
