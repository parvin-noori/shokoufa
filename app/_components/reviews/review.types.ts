export interface ReviewType {
  comment: string;
  user: {
    name: string;
  };
  product: {
    slug: string;
    title: string;
    colors: string[];
    images: {
      url: string;
    }[];
  };
}
