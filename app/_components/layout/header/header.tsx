import { auth } from "@/auth";
import BottomHeader from "./bottomHeader";
import TopHeader from "./topHeader";
import { getCartQuantity } from "@/app/lib/cart-actions";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
   const cartQuantity = await getCartQuantity();

  return (
    <header className="shadow sticky top-0 bg-white z-20">
      <div className="container">
        {/* top header  */}
        <TopHeader user={user} cartQuantity={cartQuantity}/>

        {/* bottom header  */}
        <BottomHeader />
      </div>
    </header>
  );
}
