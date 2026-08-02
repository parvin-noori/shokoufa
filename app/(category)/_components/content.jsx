import Product from "@/app/_components/products/product";

const filterList = [
  { value: "price_asc", label: "کمترین قیمت" },
  { value: "price_desc", label: "بیشترین قیمت" },
  { value: "best_seller", label: "پرفروش‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "most_discount", label: "بیشترین تخفیف" },
  //   { value: "same_day", label: "ارسال امروز" },
];

export default function Content({ products }) {
  return (
    <>
      <div className="lg:flex hidden bg-gray-100 items-center justify-between px-5 rounded-full justify-between">
        <ul className="flex items-center gap-x-2">
          {filterList.map((item) => (
            <li className="py-2" key={item.value}>
              <button
                type="button"
                className="cursor-pointer bg-transparent hover:bg-rose-500 hover:text-white px-5 py-3 rounded-full transition duration-300"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <span className="text-gray-600">{products.length} کالا</span>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
        {products.map((product, index) => (
          <Product key={index} product={product} isOffer={false} />
        ))}
      </div>
    </>
  );
}
