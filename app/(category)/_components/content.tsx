"use client";

import Product from "@/app/_components/products/product";
import { ProductType } from "@/app/_components/products/product.type";
import SortBar from "./sortBar";

export default function Content({ products }: { products: ProductType[] }) {
  return (
    <>
      <div className="lg:flex hidden bg-gray-100 items-center justify-between px-5 rounded-full justify-between">
        <SortBar />
        <span className="text-gray-600">{products.length} کالا</span>
      </div>
      {products.length ? (
        <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
          {products.map((product, index) => (
            <Product key={index} product={product} isOffer={false} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-lg">
          <span className="text-lg ">محصولی یافت نشد</span>
        </div>
      )}
    </>
  );
}
