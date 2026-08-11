"use client";

import { login } from "@/app/lib/actions";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("خوش برگشتی! 🌸");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
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
                {...register("email", {
                  required: "ایمیل الزامی است.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "فرمت ایمیل معتبر نیست.",
                  },
                })}
                placeholder="example@email.com"
                dir="ltr"
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs">{errors.email.message}</p>
            )}
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
                {...register("password", {
                  required: "رمز عبور الزامی است.",
                })}
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
            {errors.password && (
              <p className="text-rose-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-500 text-white rounded-full py-3 mt-2 cursor-pointer hover:bg-rose-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
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
