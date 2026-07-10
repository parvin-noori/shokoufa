export interface ReviewType {
  username: string;
  comment: string;
  product: {
    image_url: string;
    title: string;
    color: string;
  };
}
