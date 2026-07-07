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
      className="w-full"
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <Image
            width={1440}
            height={400}
            src={slide.image_url}
            alt={slide.text ?? "image slide"}
            className="size-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
