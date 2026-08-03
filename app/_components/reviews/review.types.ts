export interface ReviewType {
  username: string;
  comment: string;
  product: {
    slug: string;
    title: string;
    colors: string[];
    images: {
      url: string;
    }[];
  };
}
