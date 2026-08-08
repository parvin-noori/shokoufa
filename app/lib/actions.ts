"use server";

import { ProductType } from "../_components/products/product.type";
import {
  Color,
  FlowerType,
  Occasion,
  Size,
  Style,
} from "../generated/prisma/enums";
import { ProductWhereInput } from "../generated/prisma/models";
import prisma from "./prisma";
import { getSortQuery } from "./sort";

type ProductFilters = {
  flowerType?: string;
  style?: string;
  size?: string;
  colors?: string;
  sort?: string;
  category?: string;
};

function getValidValue<T extends string>(
  raw: string | undefined,
  enumObject: Record<string, T>,
): T[] {
  if (!raw) return [];
  const values = raw.split(",");
  const validValues = Object.values(enumObject);
  return values.filter((v): v is T => validValues.includes(v as T));
}

function attachExtras(products: any[]): ProductType[] {
  return products.map((p) => ({ ...p, isLikedByUser: false }));
}

export async function getProducts(filters: ProductFilters = {}) {
  const flowerTypes = getValidValue(filters.flowerType, FlowerType);
  const sizes = getValidValue(filters.size, Size);
  const styles = getValidValue(filters.style, Style);
  const colors = getValidValue(filters.colors, Color);

  const where: ProductWhereInput = {
    flowerType: flowerTypes.length ? { in: flowerTypes } : undefined,
    size: sizes.length ? { in: sizes } : undefined,
    style: styles.length ? { in: styles } : undefined,
    colors: colors.length ? { hasSome: colors } : undefined,
    categories: filters.category
      ? { some: { slug: filters.category } }
      : undefined,
  };

  const { orderBy, where: sortWhere } = getSortQuery(filters.sort);

  return prisma.product.findMany({
    where: { ...where, ...sortWhere },
    orderBy,
    include: { images: true },
  });
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
