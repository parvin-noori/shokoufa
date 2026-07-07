"use client";

import Banner from "./banner";
import Slider from "./Slider";
import { SliderItems } from "./slider.types";

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

export default function Hero() {
  return (
    <>
      <Slider slides={sliderContent} />
      <Banner />
    </>
  );
}
