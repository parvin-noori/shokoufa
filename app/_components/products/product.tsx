import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { ProductType } from "./product.type";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const originalPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="border border-gray-200 p-4 rounded-3xl flex flex-col divide-y divide-gray-200">
      <div className="flex flex-col gap-y-5 pb-4">
        <Image
          src={product.image_url}
          alt="دسته گل افتابگردون"
          width={284}
          height={284}
          className="rounded-2xl"
        />
        <span className="text-gray-800 font-bold">{product.title}</span>
        <div className="flex items-center justify-between">
          <button type="button" className="cursor-pointer">
            <Heart className="text-gray-400" />
          </button>
          <span className="flex items-center gap-x-2 text-gray-600">
            {product.rate}
            <Star />
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between pt-4">
        <span className="bg-rose-50 text-rose-500 px-2 rounded-full">
          {product.discount}%
        </span>
        <span className="flex flex-col text-gray-400">
          <span>
            <span className="text-2xl text-gray-800 font-bold">
              {originalPrice.toLocaleString()}
            </span>
            تومان
          </span>
          <span className="line-through">{product.price.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
}
