"use client";

import Product from "@/app/_components/products/product";
import { ProductType } from "@/app/_components/products/product.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterList = [
  { value: "price_asc", label: "کمترین قیمت" },
  { value: "price_desc", label: "بیشترین قیمت" },
  { value: "best_seller", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "most_discount", label: "بیشترین تخفیف" },
  //   { value: "same_day", label: "ارسال امروز" },
];

export default function Content({ products }: { products: ProductType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSort = searchParams.get("sort");

  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeSort === value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
    
  };

  return (
    <>
      <div className="lg:flex hidden bg-gray-100 items-center justify-between px-5 rounded-full justify-between">
        <ul className="flex items-center gap-x-2">
          {filterList.map((item) => {
            const isActive = activeSort === item.value;
            return (
              <li className="py-2" key={item.value}>
                <button
                  onClick={() => handleSortClick(item.value)}
                  type="button"
                  className={`cursor-pointer  px-5 py-3 rounded-full transition duration-500 ${isActive ? "bg-rose-500 text-white" : "bg-transparent hover:bg-rose-500 hover:text-white"}`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
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
