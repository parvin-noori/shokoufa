import { Prisma } from "@/app/generated/prisma/client";
import { colorLabels, sizeLabels } from "@/app/lib/labels";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

type CartItemProps = {
  cartItem: Prisma.CartItemGetPayload<{
    include: {
      product: {
        include: {
          images: true;
        };
      };
    };
  }>;
};

export default function CartItem({ cartItem }: CartItemProps) {
  const originalPrice =
    cartItem.product &&
    cartItem.product?.price * (1 - cartItem.product?.discount / 100);

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-xl grid grid-cols-6 gap-3">
      <div className="col-span-2">
        <Image
          src={cartItem.product.images[0].url}
          alt={cartItem.product.images[0].alt}
          className="w-full rounded-xl"
          width={500}
          height={800}
        />
      </div>
      <div className="col-span-4 flex flex-col gap-5">
        <div className="flex">
          <span className="text-2xl font-semibold">
            {cartItem.quantity}
            {cartItem.product.title}
          </span>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-sm">سایز</span>
            <span className="text-lg"> {sizeLabels[cartItem.size]}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-sm">رنگ</span>
            <div className="flex items-center gap-1">
              {cartItem.colors.map((color) => (
                <span className="text-lg"> {colorLabels[color]}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center  pt-5">
          <div className="flex flex-col items-end gap-y-5 ms-auto">
            <div className="flex items-center gap-x-2">
              <span className="bg-rose-50 text-rose-500 px-2 rounded-full">
                {cartItem.product?.discount}%
              </span>
              <span className="line-through text-gray-400">
                {cartItem.product?.price.toLocaleString()}
              </span>
            </div>

            <span className="flex flex-col text-gray-400 gap-x-2">
              <span>
                <span className="lg:text-2xl text-xl text-gray-800 font-bold">
                  {originalPrice?.toLocaleString()}
                </span>
                تومان
              </span>
            </span>
          </div>
          {/* <AddToCartButton
            productId={cartItem.product?.id}
            quantity={cartItem.quantity}
          /> */}
        </div>
      </div>
    </div>
  );
}
