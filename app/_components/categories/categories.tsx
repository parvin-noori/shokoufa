import { getCategories } from "@/app/actions";
import Category from "./category";

export default async function Categories() {
  const categories = await getCategories();
  return (
    <div className="categories py-10">
      <div className="flex flex-col gap-y-10">
        <span className="text-2xl mx-auto font-bold">دسته بندی ها</span>
        <div className="grid lg:grid-cols-5 grid-cols-4 gap-y-10 gap-x-1">
          {categories.map((item, index) => (
            <Category key={index} category={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
