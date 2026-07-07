import Image from "next/image";
import Link from "next/link";
import { CategoryItem } from "./category.types";

type CategoryProps = {
  category: CategoryItem;
};

export default function Category({ category }: CategoryProps) {
  return (
    <div className="flex flex-col gap-y-3 items-center">
      <Link href={category.link}>
        <Image
          src={category.image}
          alt={category.title}
          width={550}
          height={550}
          className="size-[150px] rounded-4xl"
        />
      </Link>
      <Link href={category.link}>
        <span>{category.title}</span>
      </Link>
    </div>
  );
}
