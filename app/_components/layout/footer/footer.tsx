"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Accordion from "../../accordion/accordion";

const menus = [
  {
    title: "دسترسی سریع",
    menuItems: [
      {
        title: "پرفروش ترین ها",
        href: "/",
      },
      {
        title: "گل مناسب تبریک",
        href: "/",
      },
      {
        title: "گل مناسب تسلیت",
        href: "/",
      },
      {
        title: "تخفیف های شگفت انگیز",
        href: "/",
      },
      {
        title: "بلاگ",
        href: "/",
      },
    ],
  },
  {
    title: "دسترسی سریع",
    menuItems: [
      {
        title: "پرفروش ترین ها",
        href: "/",
      },
      {
        title: "گل مناسب تبریک",
        href: "/",
      },
      {
        title: "گل مناسب تسلیت",
        href: "/",
      },
      {
        title: "تخفیف های شگفت انگیز",
        href: "/",
      },
      {
        title: "بلاگ",
        href: "/",
      },
    ],
  },
  {
    title: "دسترسی سریع",
    menuItems: [
      {
        title: "پرفروش ترین ها",
        href: "/",
      },
      {
        title: "گل مناسب تبریک",
        href: "/",
      },
      {
        title: "گل مناسب تسلیت",
        href: "/",
      },
      {
        title: "تخفیف های شگفت انگیز",
        href: "/",
      },
      {
        title: "بلاگ",
        href: "/",
      },
    ],
  },
  {
    title: "درباره ما",
    menuItems: [
      {
        title: "شکوفا در یک نگاه",
        href: "/",
      },
      {
        title: "سوالات متداول",
        href: "/",
      },
      {
        title: "تماس با ما",
        href: "/",
      },
      {
        title: "رضایت مشتریان",
        href: "/",
      },
    ],
  },
];

const socialMedia = [
  {
    title: "x",
    href: "/",
  },
  {
    title: "instagram",
    href: "/",
  },
  {
    title: "youtube",
    href: "/",
  },
  {
    title: "telegram",
    href: "/",
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="bg-rose-950 text-white py-2 lg:block hidden">
        <div className="container divide-y divide-white/40 gap-y-10">
          <div className="top flex items-center gap-x-22 py-6">
            <Link href="/">
              <Image
                src="/images/BrandLogoDark.png"
                alt="logo"
                width={158}
                height={48}
              />
            </Link>
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-1">
                <span className="text-white/80">شماره تماس:</span>
                <Link href="tel:09121231212" className="font-semibold">
                  09121231212
                </Link>
              </div>
              <div className="flex items-center gap-x-1">
                <span className="text-white/80">ساعت های پاسخگویی: </span>
                <p className="font-semibold">شنبه تا چهارشنبه. ساعت ۸ تا ۱۲</p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-rose-950 bg-white flex items-center gap-x-2 font-bold py-3 px-4 rounded-lg ms-auto cursor-pointer"
            >
              رفتن به بالا <ChevronUp />
            </button>
          </div>
          <div className="bottom flex justify-between py-6">
            {menus.map((menu, index) => (
              <div className="flex flex-col gap-y-3" key={index}>
                <span className="font-bold">{menu.title}</span>
                <ul className="text-white/80 gap-y-1 flex flex-col">
                  {menu.menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="hover:text-white-100">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 py-6">
            <ul></ul>
            <p className="text-center">تمامی حقوق متعلق به شکوفا میباشد.</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="lg:hidden block bg-rose-950 text-white px-5 rounded-lg mb-24 divide-y divide-white/40 gap-y-10">
          <div className="top flex items-center gap-x-22 py-8">
            <Link href="/">
              <Image
                src="/images/BrandLogoDark.png"
                alt="logo"
                width={158}
                height={48}
              />
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-rose-950 bg-white flex items-center gap-x-2 font-bold py-3 px-4 rounded-lg ms-auto cursor-pointer text-nowrap"
            >
              رفتن به بالا <ChevronUp />
            </button>
          </div>
          <div className="flex flex-col gap-y-1 py-6">
            <div className="flex items-center gap-x-1">
              <span className="text-white/80">شماره تماس:</span>
              <Link href="tel:09121231212" className="font-semibold">
                09121231212
              </Link>
            </div>
            <div className="flex gap-x-1">
              <span className="text-white/80 text-nowrap">
                ساعت های پاسخگویی:{" "}
              </span>
              <span className="font-semibold">
                شنبه تا چهارشنبه. ساعت ۸ تا ۱۲
              </span>
            </div>
          </div>
          <div className="bottom flex flex-col items-start gap-y-2 py-6">
            {menus.map((menu, index) => (
              <Accordion key={index} title={menu.title} variant="footer">
                <ul className="flex flex-col gap-y-1 text-white/80">
                  {menu.menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="hover:text-white">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
