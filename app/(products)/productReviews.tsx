"use client";

import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Star as StarRate } from "lucide-react";
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
  rate: number;
}

export const ratingStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: "var(--color-rose-500)",
  activeStrokeColor: "var(--color-rose-500)",
  inactiveStrokeColor: "var(--color-rose-500)",
  inactiveFillColor: "#fff",
};
export default function ProductReviews({
  reviews,
  rate,
}: ProductCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col  gap-y-10 rounded-4xl h-full">
      <Swiper
        className="w-full relative  !overflow-visible h-full"
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
            slidesPerView: 1.2,
            slidesPerGroup: 1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView: 1.5,
            slidesPerGroup: 1,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <div className="border-2 border-gray-200 rounded-lg p-5 gap-y-5 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl">{review.user.name}</span>
                <span className="flex items-center gap-x-2">
                  {rate}
                  <StarRate className="lg:hidden flex fill-rose-500" strokeWidth={0} size={20}/>
                  <div className="lg:inline-block hidden">
                    <Rating
                      style={{
                        maxWidth: 90,
                        direction: "ltr",
                      }}
                      value={4.5}
                      readOnly
                      itemStyles={ratingStyles}
                    />
                  </div>
                </span>
              </div>
              <p className="text-gray-700 text-justify line-clamp-7">
                {review.comment}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 lg:flex hidden items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
