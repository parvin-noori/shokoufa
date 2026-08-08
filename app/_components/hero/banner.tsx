import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="container lg:hidden flex mt-5">
      <div className="relative w-full">
        <Image
          src="/images/heroSection.png"
          alt="بنر"
          width={328}
          height={185}
          className="rounded-2xl w-full"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-end end-5  w-1/2  leading-[1.5] gap-y-10">
          <div className="bg-gradient-to-l from-[#331F0C] to-[#B18864] bg-clip-text text-transparent  font-bold">
            <p className="text-[20px] md:text-4xl text-end font-black">
              گاهی یک دسته گل همه چیز را میگوید
            </p>
          </div>
          <div className="flex items-center gap-x-2 font-bold">
            <div className="inline-block rounded-md overflow-hidden p-[2px] bg-gradient-to-l from-[#331F0C] to-[#B18864]">
              <Link href="/categories" className="bg-white rounded-md p-3 block">
                <span className="bg-gradient-to-l from-[#331F0C] to-[#B18864] text-nowrap bg-clip-text text-transparent font-bold">
                  دسته بندی ها
                </span>
              </Link>
            </div>
            <Link
              href="/categories"
              className="bg-gradient-to-l p-3 text-nowrap from-[#331F0C] to-[#B18864] text-white rounded-md"
            >
              مشاهده گل ها
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
