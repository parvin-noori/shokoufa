"use server";

import { ProductType } from "./_components/products/product.type";
import prisma from "./lib/prisma";

function attachExtras(products: any[]): ProductType[] {
  return products.map((p) => ({ ...p, isLikedByUser: false }));
}

export async function getProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      include: { images: true },
    });
    return attachExtras(products);
  } catch (error) {
    console.error("Database connection error:", error);
    return [];
  }
}

export async function getDiscountedProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      where: { discount: { gt: 50 } },
      include: { images: true },
    });
    return attachExtras(products);
  } catch (error) {
    console.error("Database connection error:", error);
    return [];
  }
}

export async function getBestSellerProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isBestSeller: true },
      include: { images: true },
    });
    return attachExtras(products);
  } catch (error) {
    console.error("Database connection error:", error);
    return [];
  }
}
export async function getGirlsDayProducts(): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      where: { occasion: { has: "girlsDay" } },
      include: { images: true },
    });
    return attachExtras(products);
  } catch (error) {
    console.error("Database connection error:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error("Database connection error:", error);
    return [];
  }
}
