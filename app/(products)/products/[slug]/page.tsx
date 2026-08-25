import AddToCartButton from "@/app/(cart)/_components/AddToCartButton";
import Accordion from "@/app/_components/accordion/accordion";
import ProductCarousel from "@/app/_components/products/ProductCarousel";
import RateStar from "@/app/_components/rateStar/RateStar";
import { getProductBySlug, getProducts } from "@/app/lib/actions";
import { getCartItemQuantity } from "@/app/lib/cart-actions";
import {
  BadgeCheck,
  ChevronLeft,
  HandHeart,
  Leaf,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductReviews from "../../productReviews";
import ProductGallery from "../productGallery";
import ProductOptions from "./productOptions";
import { ProductOptionsProvider } from "./ProductOptionsProvider";

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
  { rate: 3, percent: 95 },
  { rate: 2, percent: 5 },
  { rate: 1, percent: 0 },
];

const faq = [
  {
    question: "گل ها تا چه مدت تازه می مانند؟",
    ans: "لورم...",
  },
  {
    question: "آیا میتوانم زمان تحویل سفارش را انتخاب کنم؟",
    ans: "لورم...",
  },
  {
    question: "آیا امکان شخصی سازی دسته گل وجود دارد؟",
    ans: "لورم...",
  },
  {
    question: "اگر گیرنده در زمان تحویل حضور نداشته باشد چه اتفاقی می افتد؟",
    ans: "لورم...",
  },
  {
    question: "چگونه از گل ها بعد از دریافت نگهداری کنم؟",
    ans: "لورم...",
  },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const products = await getProducts();
  const originalPrice =
    product && product?.price * (1 - product?.discount / 100);
  const quantity = product ? await getCartItemQuantity(product?.id) : 0;

  return (
    <ProductOptionsProvider>
      <div className="py-5 overflow-hidden">
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
            <div className="grid lg:grid-cols-12 py-10 gap-20">
              <div className="lg:col-span-8 lg:grid lg:grid-cols-12 flex flex-col gap-5">
                <div className="lg:col-span-5">
                  {product && <ProductGallery product={product} />}
                </div>
                <div className="lg:col-span-7 flex flex-col gap-y-6 divide-y lg:divide-transparent divide-gray-200">
                  <div className="grid lg:grid-cols-1 grid-cols-2 gap-6 items-center">
                    <div className="flex items-center gap-x-2 text-gray-700 lg:order-1 order-2">
                      {product?.isBestSeller && (
                        <span className="bg-gray-200 px-5 py-2 rounded-full">
                          پرفروش
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-4xl col-span-2 lg:order-2 order-1">
                      {product?.title}
                    </span>
                    <span className="flex items-center gap-x-2 mb-8 order-3 lg:justify-start justify-end">
                      {product?.rate}
                      <Star
                        className="fill-rose-500 lg:hidden flex"
                        strokeWidth={0}
                      />
                      <div className="lg:inline-block hidden">
                        <RateStar value={4.5} />
                      </div>
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    {product && (
                      <ProductOptions
                        sizes={product?.sizes}
                        colors={product?.colors}
                      />
                    )}
                    <div className="grid grid-cols-8">
                      <div className="col-span-1"></div>
                      <button
                        type="button"
                        className="rounded-full col-span-7 bg-gray-200 w-full p-5 flex items-center gap-x-3 text-gray-700 justify-center cursor-pointer group"
                      >
                        شخصی سازی بیشتر
                        <ChevronLeft className="group-hover:transform group-hover:-translate-x-2 transition duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 lg:block hidden">
                <div className="bg-white shadow-lg p-3 rounded-xl border border-gray-200 divide-y divide-gray-200">
                  <div className="flex flex-col gap-y-3 pb-3">
                    <span className="text-emerald-600 flex items-center gap-x-1">
                      <BadgeCheck /> تضمین سلامت و تازگی گل ها
                    </span>
                    <span className="text-[#0084D1] flex items-center gap-x-1">
                      <Truck />
                      ارسال یک ساعته به شهر تهران
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-5 pt-5">
                    <div className="flex flex-col items-end gap-y-5">
                      <div className="flex items-center gap-x-2">
                        <span className="bg-rose-50 text-rose-500 px-2 rounded-full">
                          {product?.discount}%
                        </span>
                        <span className="line-through text-gray-400">
                          {product?.price.toLocaleString()}
                        </span>
                      </div>

                      <span className="flex flex-col text-gray-400 gap-x-2">
                        <span>
                          <span className="lg:text-2xl text-xl text-gray-800 font-bold">
                            {originalPrice?.toLocaleString()}
                          </span>
                          تومان
                        </span>
                      </span>
                    </div>
                    {product && (
                      <AddToCartButton
                        productId={product?.id}
                        quantity={quantity}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* services */}
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

            {/* accessories */}
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

            {/* reviews */}
            {product?.reviews?.length!==0 && (
 <div className="grid lg:grid-cols-3 grid-cols-1 py-10 gap-x-5 gap-5">
              <div className="lg:col-span-3  mx-auto">
                <span className="font-bold text-2xl">نظر خریداران</span>
              </div>
              <div className="lg:col-span-1 lg:inline-block hidden">
                <div className="shadow border-2 border-gray-200 p-5 rounded-lg gap-y-3 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">{product?.rate}</span>
                    <RateStar value={4.5} />
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
            )}
           

            {/* faq */}
            <div className="flex flex-col py-10 gap-y-3 lg:px-22">
              <span className="font-bold text-2xl mx-auto">سوالات متداول</span>
              {faq.map((faq, index) => (
                <Accordion key={index} title={faq.question}>
                  <p>{faq.ans}</p>
                </Accordion>
              ))}
            </div>

            {/* products */}
            <ProductCarousel products={products} title="شاید بپسندید" />
          </div>
        </div>
        <div className="add-to-cart fixed bottom-22 py-5 bg-white shadow border-t border-gray-200 z-10 inset-x-0 lg:hidden block">
          <div className="container">
            <div className="flex flex-col gap-y-5">
              <div className="flex gap-5 justify-end">
                <div className="flex items-center gap-x-2">
                  <span className="bg-rose-50 text-rose-500 px-2 rounded-full">
                    {product?.discount}%
                  </span>
                  <span className="line-through text-gray-400">
                    {product?.price.toLocaleString()}
                  </span>
                </div>
                <span>
                  <span className="lg:text-2xl text-xl text-gray-800 font-bold">
                    {originalPrice?.toLocaleString()}
                  </span>
                  تومان
                </span>
              </div>
              {product && (
                <AddToCartButton productId={product?.id} quantity={quantity} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ProductOptionsProvider>
  );
}
