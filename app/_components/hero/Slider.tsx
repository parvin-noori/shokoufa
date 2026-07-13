"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigations from "../navigation/navigations";
import { SliderItems } from "./slider.types";

interface SliderProps  {
  slides: SliderItems;
};

export default function Slider({ slides }: SliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="w-full lg:flex hidden">
      <Swiper
        slidesPerView={1}
        className="w-full lg:!flex !hidden [&_.swiper-pagination]:bg-white/30 [&_.swiper-pagination]:!w-auto [&_.swiper-pagination]:!end-1/2 [&_.swiper-pagination]:rounded-full [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination]:px-1 [&_.swiper-pagination-bullet-active]:!bg-white"
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          const nav = swiper.params.navigation;
          if (typeof nav !== "boolean" && nav) {
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              width={2440}
              height={1400}
              src={slide.image_url}
              alt={slide.text ?? "image slide"}
              className="size-full object-cover"
            />
            <div className="absolute top-5 start-15 xl:w-4/7 lg:w-1/2  bottom-12 flex flex-col justify-between">
              <h1 className="bg-gradient-to-l from-[#331F0C] to-[#B18864] bg-clip-text text-transparent xl:text-[64px] lg:text-[44px] font-black leading-[2]">
                {slide.text}
              </h1>

              <Link
                href="/"
                className="py-2 ps-3 pe-2 ms-26 bg-white me-auto text-[#7E5D40] bg-white rounded-full font-bold flex items-center gap-x-3"
              >
                دیدن محصولات
                <span className="flex items-center justify-center bg-gradient-to-l  from-[#331F0C] to-[#B18864] rounded-full size-[24px]">
                  <ChevronLeft color="white" size={18} />
                </span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-12 start-15 flex items-center gap-x-3 z-10">
        <Navigations prevRef={prevRef} nextRef={nextRef} />
      </div>
    </div>
  );
}
