export interface ProductType {
  slug: string;
  images: {
    url: string;
    alt: string;
  }[];
  title: string;
  rate: number;
  price: number;
  discount: number;
  isLikedByUser: boolean;
  isBestSeller: boolean;
  stock: number;
  flowerType: string;
  occasion: string[];
  style: string;
  size: string;
  colors: string[];
}
