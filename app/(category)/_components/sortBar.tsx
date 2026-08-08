import { ArrowDownWideNarrow } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortList = [
  { value: "price_asc", label: "کمترین قیمت" },
  { value: "price_desc", label: "بیشترین قیمت" },
  { value: "best_seller", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "most_discount", label: "بیشترین تخفیف" },
  //   { value: "same_day", label: "ارسال امروز" },
];

export default function SortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showDropDown, setShowDropDown] = useState(false);

  const activeSort = searchParams.get("sort");

  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeSort === value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
    setShowDropDown(false);
  };

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div className="relative">
      <button
        className="cursor-pointer lg:hidden flex flex items-center gap-x-2 p-1 justify-center w-full"
        onClick={handleDropDown}
      >
        <span>ترتیب</span>
        <ArrowDownWideNarrow size={20} />
      </button>
      <ul
        className={`lg:flex items-center lg:flex-row flex-col lg:relative absolute gap-x-2 lg:bg-transparent bg-white lg:border-0 border border-gray-200 rounded-xl lg:rounded-0 end-0 min-w-55 p-0 overflow-hidden ${showDropDown ? "flex" : "hidden"}`}
      >
        {sortList.map((item) => {
          const isActive = activeSort === item.value;
          return (
            <li className="lg:py-2 w-full" key={item.value}>
              <button
                onClick={() => handleSortClick(item.value)}
                type="button"
                className={`cursor-pointer lg:w-auto text-nowrap w-full px-5 py-3 lg:rounded-full transition duration-500 ${isActive ? "bg-rose-500 text-white" : "bg-transparent hover:bg-rose-500 hover:text-white"}`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
