"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("ایمیل یا رمز عبور اشتباه است.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-800">ورود به حساب</h1>
          <p className="text-gray-500 text-sm">
            برای ادامه، ایمیل و رمز عبورت رو وارد کن
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="email" className="text-sm text-gray-700">
              ایمیل
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
              />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                dir="ltr"
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="password" className="text-sm text-gray-700">
              رمز عبور
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-rose-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-rose-500 text-white rounded-full py-3 mt-2 cursor-pointer hover:bg-rose-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          حساب کاربری نداری؟{" "}
          <Link href="/register" className="text-rose-500 font-medium">
            ثبت‌نام کن
          </Link>
        </p>
      </div>
    </div>
  );
}