"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigations from "../navigation/navigations";
import Product from "./product";
import { ProductType } from "./product.type";

const products: ProductType[] = [
  {
    image_url: "/images/Peony.png",
    title: "دسته گل پپیونی صورتی لوکس",
    rate: 4.5,
    price: 5000000,
    discount: 55,
  },
  {
    image_url: "/images/SympathyFlowers.png",
    title: "دسته گل رز سفید کلاسیک  ",
    rate: 4.5,
    price: 3499000,
    discount: 55,
  },
  {
    image_url: "/images/sunflowers.png",
    title: "دسته گل آفتابگردان تابستانی  ",
    rate: 4.5,
    price: 2999000,
    discount: 55,
  },
  {
    image_url: "/images/MixedBouque.png",
    title: "دسته گل ترکیبی رز صورتی و لیلیوم  ",
    rate: 4.5,
    price: 4900000,
    discount: 55,
  },
  {
    image_url: "/images/sunflowers.png",
    title: "دسته گل آفتابگردان تابستانی  ",
    rate: 4.5,
    price: 2999000,
    discount: 55,
  },
  {
    image_url: "/images/MixedBouque.png",
    title: "دسته گل ترکیبی رز صورتی و لیلیوم  ",
    rate: 4.5,
    price: 4900000,
    discount: 55,
  },
];

type ProductCarouselProps = {
  title: string;
};

export default function ProductCarousel({ title }: ProductCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col py-10 gap-y-10">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{title}</span>
        <Link
          href="/"
          className="flex items-center gap-x-2 text-lg font-semibold"
        >
          بیشتر <ChevronLeft className="text-rose-500" />
        </Link>
      </div>
      <Swiper
        className="w-full !overflow-visible relative"
        spaceBetween={20}
        // loop={true}
        modules={[Navigation]}
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
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3.5,
            slidesPerGroup: 3,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <Product product={item} />
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
