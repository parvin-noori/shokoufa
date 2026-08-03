"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navigations from "../navigation/navigations";
import Post from "./Post";
import { PostType } from "./post.types";

export default function Posts({ posts }: { posts: PostType[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex flex-col py-10 gap-y-10">
      <div className="flex lg:items-center items-start justify-between">
        <div className="flex lg:flex-row flex-col lg:items-center lg:gap-x-10 lg:gap-y-0 gap-y-5">
          <span className="font-bold text-2xl">بلاگ</span>
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
            slidesPerView: 1.3,
            slidesPerGroup: 1,
          },
          640: {
            spaceBetween: 15,
            slidesPerView: 2,
            slidesPerGroup: 1.5,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 2.5,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 2.5,
          },
        }}
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="!h-auto">
            <Post post={post} />
          </SwiperSlide>
        ))}
        <div className="lg:flex hidden absolute top-1/2 transform -translate-y-1/2 items-center justify-between w-full z-10 [&_.swiper-button-disabled]:!opacity-0">
          <Navigations prevRef={prevRef} nextRef={nextRef} />
        </div>
      </Swiper>
    </div>
  );
}
