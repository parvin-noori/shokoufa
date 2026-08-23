import { getProductBySlug } from "@/app/lib/actions";
import { Rating } from "@smastrom/react-rating";
import { ChevronLeft, HandHeart, Leaf, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductReviews, { ratingStyles } from "../../productReviews";

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

const ratings = [
  { rate: 5, percent: 70 },
  { rate: 4, percent: 20 },
  { rate: 3, percent: 90 },
  { rate: 2, percent: 5 },
  { rate: 1, percent: 0 },
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
                <div
                  className="flex text-center flex-col gap-y-3 items-center"
                  key={index}
                >
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
          <div className="grid lg:grid-cols-3 grid-cols-1 py-10 gap-x-5 gap-5">
            <div className="lg:col-span-3  mx-auto">
              <span className="font-bold text-2xl">نظر خریداران</span>
            </div>
            <div className="lg:col-span-1 lg:inline-block hidden">
              <div className="shadow border-2 border-gray-200 p-5 rounded-lg gap-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">{product?.rate}</span>
                  <Rating
                    style={{
                      maxWidth: 120,
                      direction: "ltr",
                    }}
                    value={4.5}
                    readOnly
                    itemStyles={ratingStyles}
                  />
                </div>
                <p className="text-gray-700">
                  براساس {product?.reviews?.length} نظر کاربران
                </p>
                <div className="flex flex-col gap-y-2 w-full">
                  {ratings.map((rate) => (
                    <div className="flex items-center gap-x-2">
                      <span className="font-bold">{rate.rate}</span>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-rose-500 transition-all"
                          style={{ width: `${rate.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              {!!product?.reviews?.length && (
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 h-full">
                    <ProductReviews
                      reviews={product?.reviews ?? []}
                      rate={product?.rate}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
