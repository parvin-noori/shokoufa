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

interface ProductCarouselProps  {
  title: string;
  isOffer?: boolean;
};

export default function ProductCarousel({
  title,
  isOffer = false,
}: ProductCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className={`flex flex-col py-10 gap-y-10 rounded-4xl ${isOffer ? "bg-rose-50 p-8 border border-rose-300 overflow-hidden" : ""}`}
    >
      <div className="flex lg:items-center items-start justify-between">
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-x-10 lg:gap-y-0 gap-y-5">
          <span
            className={`${isOffer ? "text-rose-600 font-black lg:text-4xl text-2xl" : "font-bold text-2xl"}`}
          >
            {title}
          </span>
          {isOffer && (
            <span className="text-rose-900 text-xl">تا پایان تخفیف :</span>
          )}
        </div>
        <Link
          href="/"
          className="flex items-center gap-x-2 text-lg font-semibold"
        >
          بیشتر <ChevronLeft className="text-rose-500" />
        </Link>
      </div>
      <Swiper
        className="w-full relative  !overflow-visible"
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
            slidesPerView: isOffer ? 1.3 : 1.6,
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
            <Product product={item} isOffer={isOffer} />
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
