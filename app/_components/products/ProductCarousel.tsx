"use client"

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
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
];

type ProductCarouselProps = {
  title: string;
};

export default function ProductCarousel({ title }: ProductCarouselProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span>{title}</span>
        <Link href="/" className="flex items-center gap-x-2">
          بیشتر <ChevronLeft className="text-rose-500" />
        </Link>
      </div>
      <Swiper
        className="w-full md:!py-20 !pt-24 !overflow-visible"
        spaceBetween={20}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
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
            slidesPerView: 4.2,
            slidesPerGroup: 4,
          },
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <Product product={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
