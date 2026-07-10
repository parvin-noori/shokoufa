import CustomBouquetBanners from "./_components/banners/Banners";
import Categories from "./_components/categories/categories";
import CustomBouquet from "./_components/customBouquet/customBouquet";
import Hero from "./_components/hero/Hero";
import Header from "./_components/layout/header/header";
import NavigationBar from "./_components/navigationBar/NavigationBar";
import ProductCarousel from "./_components/products/ProductCarousel";
import Services from "./_components/services/services";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="overflow-hidden">
        <div className="container flex flex-col divide-y divide-gray-200 gap-y-10">
          <Categories />
          <Services />
          <div className=" flex flex-col  gap-y-10">
            <ProductCarousel isOffer title="تخفیفات شگفت انگیز"/>
            <ProductCarousel title="پرفروش ترین ها" />
            <CustomBouquetBanners/>
            <ProductCarousel title="روز دختر" />
          </div>
          <CustomBouquet/>
        </div>
      </div>
      <NavigationBar />
    </>
  );
}
