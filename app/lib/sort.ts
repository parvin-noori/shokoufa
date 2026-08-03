import { Prisma } from "../generated/prisma/client";

export const SORT_VALUES = [
  "price_asc",
  "price_desc",
  "best_seller",
  "newest",
  "most_discount",
] as const;

export type SortValue = (typeof SORT_VALUES)[number];

function isValidSort(value: string | undefined): value is SortValue {
  return !!value && SORT_VALUES.includes(value as SortValue);
}

type SortResult = {
  orderBy: Prisma.ProductOrderByWithRelationInput;
  where: Prisma.ProductWhereInput;
};

export function getSortQuery(rawSort: string | undefined): SortResult {
  const sort: SortValue | undefined = isValidSort(rawSort)
    ? rawSort
    : undefined;

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  let where: Prisma.ProductWhereInput = {};

  switch (sort) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "most_discount":
      orderBy = { discount: "desc" };
      break;
    case "best_seller":
      where = { isBestSeller: true };
      break;
    default:
      // مقدار نامعتبر یا خالی → همون پیش‌فرض (جدیدترین) می‌مونه
      break;
  }

  return { orderBy, where };
}
