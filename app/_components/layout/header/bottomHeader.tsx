import { ChevronDown } from "lucide-react";
import { CategoryType } from "./_type/category.type";
import Menu from "./menu";

export default function BottomHeader({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className="bottom-header py-2 lg:grid hidden xl:grid-cols-2 grid-cols-3 items-center">
      {/* right  */}
      <Menu items={categories} />

      {/* left  */}
      <div className="flex items-center gap-x-2 justify-end text-sm col-span-1">
        <p>ارسال به :</p>
        <button
          type="button"
          className="bg-gray-100 text-gray-600 p-1 rounded-full border-transparent border hover:border-black transition-color duration-300 flex items-center gap-x-2"
        >
          البرز٬ کرج
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
