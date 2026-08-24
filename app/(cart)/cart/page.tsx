import { getCart, getCartQuantity } from "@/app/lib/cart-actions";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "../_components/cartItem";

export default async function Cart() {
  const cartQuantity = await getCartQuantity();
  const cart = await getCart();
  const cartItems = cart?.items ?? [];

  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-500 py-4">
          <span>خانه</span>
          <ChevronLeft size={20} />
          <span className="text-rose-500">سبد خرید</span>
        </div>
        {cartQuantity === 0 ? (
          <div className="flex flex-col gap-4 lg:max-w-md mx-auto items-center text-center">
            <Image
              src="/images/emptyCart.png"
              alt="empty cart"
              width={200}
              height={200}
            />
            <span className="text-gray-800 font-semibold text-xl">
              سبد خرید شما خالی است!
            </span>
            <p className="text-gray-400">
              هنوز محصولی به سبد خرید اضافه نشده است. برای مشاهده و انتخاب گل
              هابه فروشگاه مراجعه کنید.
            </p>
            <div className="flex items-center gap-x-3">
              <Link
                href="/categories"
                className="flex items-center gap-x-2 bg-rose-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-rose-600 transition-colors"
              >
                دسته بندی ها
              </Link>
              <Link
                href="/"
                className="flex items-center gap-x-2 border border-rose-500 text-rose-500 px-6 py-3 rounded-xl hover:bg-rose-500 hover:text-white transition-colors"
              >
                صفحه اصلی
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12">
            <div className="col-span-8 flex flex-col gap-5">
              <span className="text-2xl font-semibold text-gray-800">
                سبد خرید
              </span>
              <p className="text-gray-600">
                شما {cartQuantity} کالا در سبد خریدتان دارید
              </p>
              <ul className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <CartItem cartItem={item} key={item.id} />
                ))}
              </ul>
            </div>
            <div className="col-span-4"></div>
          </div>
        )}
      </div>
    </div>
  );
}
