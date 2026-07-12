import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReviewType } from "./review.types";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  return (
    <div className="flex flex-col text-gray-800 gap-y-4 shadow-[0_0_24px_rgba(0,0,0,0.05)] border border-gray-200 p-5 rounded-2xl">
      <span className="font-bold">{review.username}</span>
      <p className="text-gray-700">{review.comment}</p>
      <div className="flex flex-col gap-y-3 mt-5">
        <span className="font-bold">محصول خریداری شده:</span>
        <div className="border border-gray-200 bg-gray-50 rounded-lg p-2 flex items-stretch gap-x-2 text-sm">
          <Image
            src={review.product.image_url}
            alt={review.product.title}
            width={84}
            height={84}
            className="size-22 rounded-lg"
          />
          <div className="flex flex-col justify-between w-full">
            <span className="font-semibold line-clamp-2">{review.product.title}</span>
            <div className="flex items-center justify-between">
              <span className="p-1.5 border border-gray-200 bg-white rounded-full font-semibold text-gray-600 flex items-center gap-x-2">
                {review.product.color}
                <div className="size-4.5 rounded-full bg-yellow-400"></div>
              </span>
              <Link
                href="/"
                className="flex items-center gap-x-1 text-gray-600 font-semibold"
              >
                <span className="lg:block hidden">رفتن به محصول</span>

                <ChevronLeft />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
