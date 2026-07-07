import localFont from "next/font/local";

export const Peyda = localFont({
  src: [
    {
      path: "./fonts/PeydaWeb-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-extralight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/PeydaWeb-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-peyda",
});