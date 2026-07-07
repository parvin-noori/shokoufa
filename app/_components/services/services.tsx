import Service from "./service";
import { ServiceItem } from "./services.types";

const services: ServiceItem[] = [
  {
    image_url: "/images/FreshestFlowers.png",
    title: "تازه ترین گل ها",
    subtitle:
      "گل‌های ما هر روز به‌صورت مستقیم از بهترین گلخانه‌ها تهیه می‌شوند تا تازگی و ماندگاری هدیه شما تضمین شود.",
  },
  {
    image_url: "/images/Professional&UniqueDesign.png",
    title: "طراحی حرفه ای و خاص",
    subtitle:
      "هر دسته‌گل با توجه به مناسبت و سلیقه شما توسط طراحان گل‌آرایی به‌صورت اختصاصی و هنرمندانه آماده می‌شود.",
  },
  {
    image_url: "/images/Fast&ReliableDelivery.png",
    title: "تحویل سریع و مطمئن",
    subtitle:
      "سفارش شما در کوتاه‌ترین زمان و با بسته‌بندی ایمن، دقیق و بدون آسیب به دست گیرنده می‌رسد.",
  },
  {
    image_url: "/images/EasyShoppingExperience.png",
    title: "تجربه خرید آسان و دل‌نشین",
    subtitle:
      "از انتخاب تا ثبت سفارش، همه‌چیز ساده، سریع و بدون پیچیدگی طراحی شده تا تجربه‌ای راحت و لذت‌بخش داشته باشید.",
  },
];

export default function Services() {
  return(
      <div className="categories py-10">
          <div className="flex flex-col gap-y-10">
            <span className="text-2xl mx-auto font-bold">چرا شکوفا؟</span>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
              {services.map((item, index) => (
                <Service key={index} service={item} />
              ))}
            </div>
          </div>
        </div>
  )
}
