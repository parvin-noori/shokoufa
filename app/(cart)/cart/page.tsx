import { getCart, getCartQuantity } from "@/app/lib/cart-actions";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "../_components/cartItem";

export default async function Cart() {
  const cartQuantity = await getCartQuantity();
  const cart = await getCart();
  const cartItems = cart?.items ?? [];

  if (!cart) {
    return null;
  }

  const { totalPrice, totalDiscount, finalPrice } = cart.summary;

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
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex flex-col gap-5">
              <span className="text-2xl font-semibold text-gray-800">
                سبد خرید
              </span>
              <p className="text-gray-600">
                شما {cartQuantity} کالا در سبد خریدتان دارید
              </p>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <ul className="flex flex-col gap-5">
                {cartItems.map((item) => (
                  <CartItem cartItem={item} key={item.id} />
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col divide-y divide-gray-200 text-gray-800">
                <div className="flex flex-col gap-5 pb-5">
                  <span className="font-semibold text-lg"> صورتحساب</span>
                  <div className="flex items-center gap-2">
                    <span>جمع محصولات </span>
                    <div className="border border-dashed grow border-gray-200"></div>
                    <span className="flex gap-1 items-center">
                      {totalPrice.toLocaleString()}
                      <span className="text-sm text-gray-600">تومان</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>تخفیف </span>
                    <div className="border border-dashed grow border-gray-200"></div>
                    <span className="flex gap-1 items-center">
                      {totalDiscount.toLocaleString()}
                      -
                      <span className="text-sm text-gray-600">تومان</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-5 text-nowrap pt-5">
                  <div className="flex items-center gap-2 ">
                    <span>جمع کل </span>
                    <div className="border border-dashed border-gray-200 grow"></div>
                    <span className="flex gap-1 items-center">
                      {finalPrice.toLocaleString()}
                      <span className="text-sm text-gray-600">تومان</span>
                    </span>
                  </div>
                  <button className="bg-rose-500 text-white w-full p-3 rounded-lg cursor-pointer">
                    ادامه
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
