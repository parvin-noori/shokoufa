"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderItems } from "./slider.types";

type SliderProps = {
  slides: SliderItems;
};

export default function Slider({ slides }: SliderProps) {
  return (
    <Swiper
      slidesPerView={1}
      className="w-full lg:!flex !hidden"
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <Image
            width={1440}
            height={400}
            src={slide.image_url}
            alt={slide.text ?? "image slide"}
            className="size-full object-cover"
          />
          <div className="absolute top-5 start-5 w-full">
            <h1 className="bg-gradient-to-l from-[#331F0C] to-[#B18864] bg-clip-text text-transparent text-5xl font-bold w-2/5  leading-[1.5]">
              {slide.text}
            </h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
