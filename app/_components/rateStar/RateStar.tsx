import { Rating, Star } from "@smastrom/react-rating";

export const ratingStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: "var(--color-rose-500)",
  activeStrokeColor: "var(--color-rose-500)",
  inactiveStrokeColor: "var(--color-rose-500)",
  inactiveFillColor: "#fff",
};
export default function RateStar({ value }: { value: number }) {
  return (
    <Rating
      style={{
        maxWidth: 90,
        direction: "ltr",
      }}
      value={value}
      readOnly
      itemStyles={ratingStyles}
    />
  );
}
