import prisma from "@/app/lib/prisma";
import ReviewSlider from "./reviewSlider";

export default async function Review() {
  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true } },
      product: {
        include: {
          images: true,
        },
      },
    },
  });
  console.log(reviews);
  if (!reviews?.length) return null;
  return (
    <>
      <ReviewSlider reviews={reviews} />
    </>
  );
}
