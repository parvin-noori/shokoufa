import Image from "next/image";

export default function Banner() {
  return (
    <div className="container">

    <Image
      src="/images/heroSection.png"
      alt="بنر"
      width={328}
      height={185}
      className="rounded-2xl lg:hidden flex w-full"
      />
      </div>
  );
}
