import Image from "next/image";
import Link from "next/link";
import { CategoryItem } from "./category.types";

interface CategoryProps  {
  category: CategoryItem;
};

export default function Category({ category }: CategoryProps) {
  return (
    <div className="flex flex-col gap-y-3 items-center text-center">
      <Link href={category.link}>
        <Image
          src={category.image}
          alt={category.title}
          width={550}
          height={550}
          className="md:size-[150px] size-[70px] md:rounded-4xl rounded-xl"
        />
      </Link>
      <Link href={category.link}>
        <span className="font-semibold">{category.title}</span>
      </Link>
    </div>
  );
}
