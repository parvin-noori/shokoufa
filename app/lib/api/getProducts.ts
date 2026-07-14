// import { ProductsData } from "@/app/mocks/products";

import { ProductsData } from "@/app/mocks/products";
import { FilterType } from "@/app/mocks/filters";

// export type Product = (typeof ProductsData)[number];

// export type ProductFilters = {
//   flowerType: string[];
//   occasion: string[];
//   style: string | null;
//   size: string | null;
//   //   sort: string;
//   //   page: number;
//   //   pageSize: number;
// };

// export async function getProducts(filters:ProductFilters){

// }

export function getProducts() {
  return ProductsData;
}
export function getFilters() {
  return FilterType;
}


