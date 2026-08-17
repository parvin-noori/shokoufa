"use client";

import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigations from "../_components/navigation/navigations";

interface ProductCarouselProps {
  reviews: {
    id: string;
    comment: string;
    user: {
      name: string;
    };
  }[];
}

export default function ProductReviews({ reviews }: ProductCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col py-10 gap-y-10 rounded-4xl">
      <Swiper
        className="w-full relative  !overflow-visible"
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
            spaceBetween: 10,
            slidesPerView: 1.6,
            slidesPerGroup: 1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 3.5,
            slidesPerGroup: 3,
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <span>{review.user.name}</span>
            <p>{review.comment}</p>
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 lg:flex hidden items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
