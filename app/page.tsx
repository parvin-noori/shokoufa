import Categories from "./_components/categories/categories";
import Header from "./_components/layout/header/header";
import Services from "./_components/services/services";
import Slider from "./_components/slider/Slider";
import { SliderItems } from "./_components/slider/slider.types";

const sliderContent: SliderItems = [
  {
    text: "دسته گل های دستچین شده برای لحظه های خاص",
    image_url: "/images/Gemini_Generated_Image_a3oaxoa3oaxoa3oa1.png",
  },
  {
    text: "slider 2",
    image_url: "/images/Gemini_Generated_Image_a3oaxoa3oaxoa3oa1.png",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Slider slides={sliderContent} />
      <div className="container flex flex-col divide-y divide-gray-200">
        <Categories />
        <Services />
      </div>
    </>
  );
}
