import Categories from "./_components/categories/categories";
import Hero from "./_components/hero/Hero";
import Header from "./_components/layout/header/header";
import Services from "./_components/services/services";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="container flex flex-col divide-y divide-gray-200">
        <Categories />
        <Services />
      </div>
    </>
  );
}
