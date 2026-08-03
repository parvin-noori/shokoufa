import { getProducts } from "@/app/lib/actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Content from "../_components/content";
import Sidebar from "../_components/sidebar";

type SearchParams = {
  flowerType?: string;
  occasion?: string;
  style?: string;
  size?: string;
  colors?: string;
  sort?: string;
};

export default async function Categories({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-500 py-4">
          <span>خانه</span>
          <ChevronLeft size={20} />
          <Link href="/category" className="text-rose-500">
            دسته بندی
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-x-5">
          {/* sidebar  */}
          <Suspense fallback={null}>
            <Sidebar />
          </Suspense>
          {/* content  */}
          <div className="lg:col-span-3 flex flex-col gap-y-3 gap-y-5">
            <Suspense fallback={null}>
              <Content products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
