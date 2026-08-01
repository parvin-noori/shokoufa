import BottomHeader from "./bottomHeader";
import TopHeader from "./topHeader";

export default function Header() {
  return (
    <header className="shadow sticky top-0 bg-white z-20">
      <div className="container">
        {/* top header  */}
        <TopHeader />

        {/* bottom header  */}
        <BottomHeader />
      </div>
    </header>
  );
}
