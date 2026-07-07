import Image from "next/image";
import { ServiceItem } from "./services.types";

type ServiceProps = {
  service: ServiceItem;
};
export default function Service({ service }: ServiceProps) {
  return (
    <>
      <div className="flex flex-col gap-y-3 lg:items-start items-center">
          <Image
            src={service.image_url}
            alt={service.title}
            width={550}
            height={550}
            className="w-full md:rounded-2xl rounded-xl"
          />
          <span className="font-semibold">{service.title}</span>
          <p className="text-gray-500 lg:block hidden">{service.subtitle}</p>
      </div>
    </>
  );
}
