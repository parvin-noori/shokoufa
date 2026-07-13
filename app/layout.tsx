import Footer from "./_components/layout/footer/footer";
import Header from "./_components/layout/header/header";
import NavigationBar from "./_components/navigationBar/NavigationBar";
import { Peyda } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa" className={` ${Peyda.className}  h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <NavigationBar />
      </body>
    </html>
  );
}
