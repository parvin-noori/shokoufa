"use client";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center gap-y-6">
      <div className="bg-rose-50 rounded-full p-6">
        <AlertTriangle className="text-rose-500" size={48} />
      </div>

      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          مشکلی پیش اومد!
        </h1>
        <p className="text-gray-500 max-w-md">
          متأسفانه در دریافت اطلاعات خطایی رخ داد. لطفاً دوباره تلاش کنید یا
          چند لحظه دیگه برگردید.
        </p>
      </div>

      {/* {process.env.NODE_ENV === "development" && (
        <pre className="bg-gray-100 text-red-600 text-xs p-4 rounded-lg max-w-lg overflow-auto text-left" dir="ltr">
          {error.message}
        </pre>
      )} */}

      <div className="flex items-center gap-x-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-x-2 bg-rose-500 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-rose-600 transition-colors"
        >
          <RotateCcw size={18} />
          تلاش مجدد
        </button>
        <Link
          href="/"
          className="flex items-center gap-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Home size={18} />
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}