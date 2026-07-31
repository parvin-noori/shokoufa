import CustomBouquetBanners from "./_components/banners/Banners";
import Posts from "./_components/blog/posts";
import Categories from "./_components/categories/categories";
import CustomBouquet from "./_components/customBouquet/customBouquet";
import Hero from "./_components/hero/Hero";
import ProductCarousel from "./_components/products/ProductCarousel";
import Reviews from "./_components/reviews/reviews";
import Services from "./_components/services/services";
import {
  getBestSellerProducts,
  getDiscountedProducts,
  getGirlsDayProducts,
} from "./actions";

export default async function Home() {
  const discountedProducts = await getDiscountedProducts();
  const bestSellerProducts = await getBestSellerProducts();
  const girlsDayProducts = await getGirlsDayProducts();

  return (
    <>
      <Hero />
      <div className="overflow-hidden">
        <div className="container flex flex-col divide-y divide-gray-200 gap-y-10">
          <Categories />
          <Services />
          <div className=" flex flex-col  gap-y-10">
            {!!discountedProducts.length && (
            <ProductCarousel
              isOffer
              title="تخفیفات شگفت انگیز"
              products={discountedProducts}
              />
            )}
            {!!bestSellerProducts.length && (
              <ProductCarousel
                title="پرفروش ترین ها"
                products={bestSellerProducts}
              />
            )}
            <CustomBouquetBanners />
            {!!girlsDayProducts.length && (
              <ProductCarousel title="روز دختر" products={girlsDayProducts} />
            )}
          </div>
          <CustomBouquet />
          <Reviews />
          <Posts />
        </div>
      </div>
    </>
  );
}
