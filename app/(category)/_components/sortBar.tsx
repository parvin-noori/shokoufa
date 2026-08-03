import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const activeSort = searchParams.get("sort");

  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeSort === value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <ul className="flex items-center gap-x-2">
      {sortList.map((item) => {
        const isActive = activeSort === item.value;
        return (
          <li className="py-2" key={item.value}>
            <button
              onClick={() => handleSortClick(item.value)}
              type="button"
              className={`cursor-pointer  px-5 py-3 rounded-full transition duration-500 ${isActive ? "bg-rose-500 text-white" : "bg-transparent hover:bg-rose-500 hover:text-white"}`}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
