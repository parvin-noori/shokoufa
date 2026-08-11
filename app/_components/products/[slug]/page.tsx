import { getProductBySlug } from "@/app/lib/actions";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  console.log(slug)

  return <>{product?.title}</>;
}
