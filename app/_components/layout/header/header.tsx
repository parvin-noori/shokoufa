import { auth } from "@/auth";
import BottomHeader from "./bottomHeader";
import TopHeader from "./topHeader";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="shadow sticky top-0 bg-white z-20">
      <div className="container">
        {/* top header  */}
        <TopHeader user={user} />

        {/* bottom header  */}
        <BottomHeader />
      </div>
    </header>
  );
}
