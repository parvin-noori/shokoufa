import { getCategories, getProducts } from "@/app/lib/actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Content from "../_components/content";
import Sidebar from "../_components/sidebar";

type SearchParams = {
  flowerType?: string;
  style?: string;
  size?: string;
  colors?: string;
  sort?: string;
  category?: string;
};

export default async function Categories({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-500 py-4">
          <span>خانه</span>
          <ChevronLeft size={20} />
          <Link href="/categories" className="text-rose-500">
            دسته بندی
          </Link>
          {activeCategory && (
            <>
              <ChevronLeft size={20} />
              <span className="text-rose-500">{activeCategory.title}</span>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-x-5">
          {/* sidebar  */}
          <Suspense fallback={null}>
            <Sidebar categories={categories} />
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
