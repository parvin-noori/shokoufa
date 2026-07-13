"use client";

import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigations from "../navigation/navigations";
import Review from "./review";
import { ReviewType } from "./review.types";

const reviews: ReviewType[] = [
  {
    username: "نام کاربر",
    comment:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،",
    product: {
      image_url: "/images/pinkTulip.png",
      title: "گل لاله صورتی مینیمال",
      color: "صورتی",
    },
  },
  {
    username: "نام کاربر",
    comment:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،",
    product: {
      image_url: "/images/sunflowers.png",
      title: "دسته گل تابستانی با دیزاین مینیمال",
      color: "زرد",
    },
  },
  {
    username: "نام کاربر",
    comment:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،",
    product: {
      image_url: "/images/pinkTulip.png",
      title: "گل لاله صورتی مینیمال",
      color: "صورتی",
    },
  },
];

export default function Reviews() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col py-10 gap-y-10">
      <span className="font-bold text-2xl text-center">رضایت مشتریان</span>
      <Swiper
        className="w-full relative  !overflow-visible"
        spaceBetween={20}
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
            slidesPerView: 1.1,
            slidesPerGroup: 1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView: 1.5,
            slidesPerGroup: 1.5,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 2.5,
            slidesPerGroup: 2.5,
          },
        }}
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <Review review={item} />
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 lg:flex hidden items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
