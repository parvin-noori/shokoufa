import { ChevronDown } from "lucide-react";
import MainMenu from "./mainMenu";

export default function BottomHeader() {
  return (
    <div className="bottom-header py-2 lg:grid hidden grid-cols-2 items-center">
      {/* right  */}
      <MainMenu />

      {/* left  */}
      <div className="flex items-center gap-x-2 justify-end text-sm">
        <p>ارسال به :</p>
        <button
          type="button"
          className="bg-gray-100 text-gray-600 p-1 rounded-full border-transparent border hover:border-black transition-color duration-300 flex items-center gap-x-2"
        >
          البرز٬ کرج
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
