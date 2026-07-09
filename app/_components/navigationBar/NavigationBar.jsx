import { Heart, House, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  const navigationMenus = [
    {
      title: "خانه",
      icon: <House />,
      link: "/",
    },
    {
      title: "سبد خرید",
      icon: <ShoppingCart />,
      link: "/",
    },
    {
      title: "علاقه مندی ها",
      icon: <Heart />,
      link: "/",
    },
    {
      title: "پروفایل",
      icon: <User />,
      link: "/",
    },
  ];
  return (
    <div className="fixed bottom-0 bg-white inset-x-0 py-4 inset-shadow-sm lg:hidden flex">
      <div className="container ">
        <ul className="flex items-center justify-between px-5">
          {navigationMenus.map((item,index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="flex flex-col gap-y-2 items-center text-gray-600"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
