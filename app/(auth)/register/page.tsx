"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { registerUser } from "@/app/lib/actions";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیست.");
      return;
    }
    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    setLoading(true);

    const result = await registerUser({ name, email, password });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // بعد از ثبت‌نام موفق، خودکار لاگین کن
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.error) {
      setError("ثبت‌نام موفق بود ولی ورود خودکار انجام نشد. لطفاً وارد شوید.");
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-800">ساخت حساب کاربری</h1>
          <p className="text-gray-500 text-sm">
            چند قدم تا شروع خرید فاصله داری
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="name" className="text-sm text-gray-700">
              نام و نام خانوادگی
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
              />
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام شما"
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
            </div>
          </div>

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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="حداقل ۸ کاراکتر"
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

          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700">
              تکرار رمز عبور
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
              />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز عبور"
                dir="ltr"
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
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
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          قبلاً حساب ساختی؟{" "}
          <Link href="/login" className="text-rose-500 font-medium">
            وارد شو
          </Link>
        </p>
      </div>
    </div>
  );
}