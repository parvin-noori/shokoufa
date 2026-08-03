import prisma from "@/app/lib/prisma";
import ReviewSlider from "./reviewSlider";

export default async function Review() {
  const reviews = await prisma.review.findMany({
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
  });
  return <ReviewSlider reviews={reviews} />;
}
