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
} from "./lib/actions";
import prisma from "./lib/prisma";

export default async function Home() {
  const posts=await prisma.post.findMany()
  const [discountedProducts, bestSellerProducts, girlsDayProducts] =
    await Promise.all([
      getDiscountedProducts(),
      getBestSellerProducts(),
      getGirlsDayProducts(),
    ]);

  const carouselSections = [
    {
      type: "carousel",
      key: "discounted",
      title: "تخفیفات شگفت انگیز",
      products: discountedProducts,
      isOffer: true,
    },
    {
      type: "carousel",
      key: "bestSeller",
      title: "پرفروش ترین ها",
      products: bestSellerProducts,
    },
    {
      type: "banner",
      key: "custom-botique-banner",
    },
    {
      type: "carousel",
      key: "girlsDay",
      title: "روز دختر",
      products: girlsDayProducts,
    },
  ];
  return (
    <>
      <Hero />
      <div className="overflow-hidden">
        <div className="container flex flex-col divide-y divide-gray-200 gap-y-10">
          <Categories />
          <Services />
          <div className=" flex flex-col  gap-y-10">
            {carouselSections.map((section) => {
              if (section.type === "banner") {
                return <CustomBouquetBanners key={section.key} />;
              } else {
                if (!section.products?.length) return null;

                return (
                  <ProductCarousel
                    key={section.key}
                    title={section.title}
                    products={section.products}
                    isOffer={section.isOffer}
                  />
                );
              }
            })}
          </div>
          <CustomBouquet />
          <Reviews />
          <Posts posts={posts}/>
        </div>
      </div>
    </>
  );
}
