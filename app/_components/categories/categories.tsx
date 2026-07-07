import Category from "./category";
import { CategoryItem } from "./category.types";

const categories: CategoryItem[] = [
  {
    title: "دسته گل رز ",
    image: "/images/roseBouquet.png",
    link:"/",
},
{
    title: "باکس گل لوکس",
    image: "/images/LuxuryFlowerBox.png",
    link:"/",
},
{
    title: " گل های عاشقانه",
    image: "/images/RomanticBouquets.png",
    link:"/",
},
{
    title: " گل تولد",
    image: "/images/BirthdayFlowers.png",
    link:"/",
},
{
    title: " گل تبریک",
    image: "/images/CongratulationsFlowers.png",
    link:"/",
},
{
    title: " گل تسلیت",
    image: "/images/SympathyFlowers.png",
    link:"/",
},
{
    title: " گل های مینیمال",
    image: "/images/MinimalBouquets.png",
    link:"/",
},
{
    title: " گل های فصلی",
    image: "/images/SeasonalFlowers.png",
    link:"/",
},
{
    title: " گیاه های آپارتمانی",
    image: "/images/IndoorPlants.png",
    link:"/",
},
{
    title: "ساخت دست گل دلخواه",
    image: "/images/CustomBouquetBuilder.png",
    link:"/",
  },
];

export default function Categories() {
  return (
    <div className="categories py-10">
      <div className="container flex flex-col gap-y-10">
        <span className="text-2xl mx-auto">دسته بندی ها</span>
        <div className="grid grid-cols-5 gap-10">
          {categories.map((item, index) => (
            <Category key={index} category={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
