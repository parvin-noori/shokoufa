import { Product, ProductImage } from "@/app/generated/prisma/client";

export type ProductType = Product & {
  images: ProductImage[];
  // isLikedByUser: boolean;
};
