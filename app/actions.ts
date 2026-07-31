"use server";

import { ProductType } from "./_components/products/product.type";
import prisma from "./lib/prisma";

function attachExtras(products: any[]): ProductType[] {
  return products.map((p) => ({ ...p, isLikedByUser: false }));
}

export async function getProducts(): Promise<ProductType[]> {
  const products = await prisma.product.findMany({
    include: { images: true },
  });
  return attachExtras(products);
}

export async function getDiscountedProducts(): Promise<ProductType[]> {
  const products = await prisma.product.findMany({
    where: { discount: { gt: 50 } },
    include: { images: true },
  });
  return attachExtras(products);
}

export async function getBestSellerProducts(): Promise<ProductType[]> {
  const products = await prisma.product.findMany({
    where: { isBestSeller: true },
    include: { images: true },
  });
  return attachExtras(products);
}
export async function getGirlsDayProducts(): Promise<ProductType[]> {
  const products = await prisma.product.findMany({
    where: { occasion: { has: "girlsDay" } },
    include: { images: true },
  });
  console.log(products)
  return attachExtras(products);
}
