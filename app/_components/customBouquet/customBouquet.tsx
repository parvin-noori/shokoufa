import Image from "next/image";

export default function CustomBouquet() {
  return (
    <div className="flex flex-col gap-y-5 lg:w-[786px] w-full mx-auto text-center py-10">
      <span className="md:text-4xl text-2xl text-gray-400 font-semibold">
        دسته گل رویاییتان را <span className="text-gray-800">خودتان</span> خلق
        کنید!
      </span>
      <p className="text-gray-600 font-semibold">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است
      </p>
      <Image src="/images/customize.png" alt="customize" width={1279} height={149} className="w-full"/>
      <button type="button" className="bg-rose-500 text-white rounded-xl py-3 cursor-pointer font-semibold hover:bg-rose-400 transition duration-200">شروع کنید</button>
    </div>
  );
}
