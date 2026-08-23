import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "./product.type";

interface ProductProps {
  product: ProductType;
  isOffer: boolean;
}

export default function Product({ product, isOffer = false }: ProductProps) {
  const originalPrice = product.price * (1 - product.discount / 100);
  

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`bg-white h-full border p-4 rounded-3xl flex flex-col divide-y divide-gray-200 ${isOffer ? " border-rose-200" : " border-gray-200"}`}
    >
      <div className="flex flex-col gap-y-5 pb-4">
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          width={500}
          height={500}
          className="rounded-2xl w-full aspect-square object-cover"
        />
        <span className="text-gray-800 font-bold line-clamp-1">
          {product.title}
        </span>
        <div className="flex items-center justify-between">
          <button type="button" className="cursor-pointer">
            <Heart className="text-gray-400" />
          </button>
          <span className="flex items-center gap-x-2 text-gray-600 font-semibold">
            {product.rate}
            <Star className="fill-rose-500" stroke="none" />
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between pt-4">
        <span className="bg-rose-50 text-rose-500 px-2 rounded-full">
          {product.discount}%
        </span>
        <span className="flex flex-col text-gray-400">
          <span>
            <span className="lg:text-2xl text-xl text-gray-800 font-bold">
              {originalPrice.toLocaleString()}{" "}
            </span>
            تومان
          </span>
          <span className="line-through">{product.price.toLocaleString()}</span>
        </span>
      </div>
    </Link>
  );
}
