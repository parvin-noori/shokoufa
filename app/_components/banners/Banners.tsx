import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    title: "شخصی سازی دسته گل دلخواه",
    image_url: "/images/CustomBouquetBanners.png",
  },
  {
    title: "شخصی سازی دسته گل دلخواه",
    image_url: "/images/CustomBouquetBanners.png",
  },
  {
    title: "شخصی سازی دسته گل دلخواه",
    image_url: "/images/CustomBouquetBanners.png",
  },
];

export default function CustomBouquetBanners() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-5 gap-2">
      {banners.map((item, index) => (
        <Link href="/" key={index}>
          <Image src={item.image_url} alt={item.title} className="w-full" width={432} height={216}/>
        </Link>
      ))}
    </div>
  );
}
