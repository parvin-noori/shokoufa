import { getProductBySlug } from "@/app/lib/actions";
import { ChevronLeft, HandHeart, Leaf, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductReviews from "../../productReviews";

type Props = {
  params: Promise<{ slug: string }>;
};

const services = [
  {
    icon: Truck,
    title: "ارسال سریع",
    subtitle: "ارسال دو ساعته به شهر تهران",
  },
  {
    icon: Leaf,
    title: "گل های تازه",
    subtitle: "پرورش گل ها در گل خانه های مناسب",
  },
  {
    icon: HandHeart,
    title: "گل های دستچین شده",
    subtitle: "گل ها توسط گلپرورهای حرفه ای انتخاب شده اند",
  },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-500 py-4">
          <span>خانه</span>
          <ChevronLeft size={20} />
          <Link
            href={`/categories?.category=${product?.categories[0]?.slug}`}
            className="text-rose-500"
          >
            {product?.categories[0].title}
          </Link>
          <ChevronLeft size={20} />
          <span className="text-rose-500">{product?.title}</span>
        </div>
        <div className="flex flex-col divide divide-y divide-gray-200">
          <div className="grid grid-cols-12">
            <div className="col-span-8"></div>
            <div className="col-span-4"></div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:px-22 py-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div className="flex text-center flex-col gap-y-3 items-center" key={index}>
                  <span className="size-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Icon className="text-emerald-600" />
                  </span>
                  <span className="font-bold text-gray-800 text-lg">
                    {service.title}
                  </span>
                  <p className="text-gray-600">{service.subtitle}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col py-10 gap-y-10">
            <span className="font-bold text-2xl mx-auto">اقلام همراه</span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
              {product?.accessories.map((acc) => (
                <div
                  key={acc.id}
                  className="flex flex-col gap-y-2 items-center bg-gray-50 rounded-xl p-10"
                >
                  <Image
                    src={acc.image_url ?? "/"}
                    alt={acc.title}
                    width={100}
                    height={100}
                  />
                  <span className="font-semibold">{acc.title}</span>
                </div>
              ))}
            </div>
          </div>
          {product?.reviews?.length ?? (
            <div className="flex flex-col py-10 gap-y-10">
              <span className="font-bold text-2xl mx-auto">نظر خریداران</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
                <ProductReviews reviews={product?.reviews ?? []} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
