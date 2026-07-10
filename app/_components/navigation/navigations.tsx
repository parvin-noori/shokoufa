import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject } from "react";

interface NavigationsProps {
  prevRef: RefObject<HTMLButtonElement | null>;
  nextRef: RefObject<HTMLButtonElement | null>;
}

export default function Navigations({prevRef,nextRef}:NavigationsProps) {
  return (
    <>
      <button
        ref={prevRef}
        className="p-2 bg-white/30 backdrop-blur-sm rounded-full drop-shadow-[0_0_15px_rgba(0,0,0,0.10)] disabled:opacity-40 disabled:cursor-not-allowed [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none cursor-pointer z-10"
      >
        <ChevronRight className="size-6 text-gray-800" />
      </button>
      <button
        ref={nextRef}
        className="p-2 bg-white/30 backdrop-blur-sm rounded-full drop-shadow-[0_0_15px_rgba(0,0,0,0.10)] [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none cursor-pointer"
      >
        <ChevronLeft className="size-6 text-gray-800" />
      </button>
    </>
  );
}
