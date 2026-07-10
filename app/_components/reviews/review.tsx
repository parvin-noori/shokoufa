import { ReviewType } from "./review.types";

interface ReviewProps {
  review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
  return (
    <div className="flex flex-col gap-y-5 shadow-lg">
      <span>{review.username}</span>
      <p>{review.comment}</p>
    </div>
  );
}
