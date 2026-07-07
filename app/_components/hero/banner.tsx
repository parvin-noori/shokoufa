import Image from "next/image";

export default function Banner() {
  return (
    <div className="container relative lg:hidden flex">
      <Image
        src="/images/heroSection.png"
        alt="بنر"
        width={328}
        height={185}
        className="rounded-2xl  w-full"
      />
      <h1 className="absolute top-0 bg-gradient-to-l from-[#331F0C] to-[#B18864] bg-clip-text text-transparent text-2xl font-bold w-1/2  leading-[1.5]">
        <p>گاهی یک دسته گل همه چیز را میگوید</p>
      </h1>
    </div>
  );
}
