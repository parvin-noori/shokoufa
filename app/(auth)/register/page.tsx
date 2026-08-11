"use client";

import { signUp } from "@/app/lib/actions";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("ثبت‌نام با موفقیت انجام شد. خوش اومدی! 🌸");
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
          <h1 className="text-2xl font-bold text-gray-800">ساخت حساب کاربری</h1>
          <p className="text-gray-500 text-sm">
            چند قدم تا شروع خرید فاصله داری
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
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
                placeholder="نام شما"
                {...register("name", {
                  required: "نام و نام خانوادگی الزامی است",
                  minLength: {
                    value: 3,
                    message: "نام باید حداقل ۳ کاراکتر باشد.",
                  },
                })}
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs">{errors.name.message}</p>
            )}
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
                placeholder="example@email.com"
                dir="ltr"
                {...register("email", {
                  required: "ایمیل الزامی است.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "فرمت ایمیل معتبر نیست.",
                  },
                })}
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
                placeholder="حداقل ۸ کاراکتر"
                dir="ltr"
                {...register("password", {
                  required: "رمز عبور الزامی است.",
                  minLength: {
                    value: 8,
                    message: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
                  },
                })}
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
                placeholder="تکرار رمز عبور"
                dir="ltr"
                {...register("confirmPassword", {
                  required: "تکرار رمز عبور الزامی است.",
                  validate: (value) =>
                    value === password || "رمز عبور و تکرار آن یکسان نیست.",
                })}
                className="w-full border border-gray-300 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-rose-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-rose-500 text-white rounded-full py-3 mt-2 cursor-pointer hover:bg-rose-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
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
