// app/not-found.tsx
import { Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-y-6">
      <div className="bg-rose-50 rounded-full p-6">
        <SearchX className="text-rose-500" size={48} />
      </div>

      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          صفحه مورد نظر پیدا نشد
        </h1>
        <p className="text-gray-500 max-w-md">
          صفحه‌ای که دنبالش بودید وجود نداره یا جابه‌جا شده.
        </p>
      </div>

      <Link
        href="/"
        className="flex items-center gap-x-2 bg-rose-500 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
      >
        <Home size={18} />
        بازگشت به خانه
      </Link>
    </div>
  );
}