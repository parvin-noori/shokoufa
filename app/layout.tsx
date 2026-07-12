import { Peyda } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="en" className={` ${Peyda.className}  h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
