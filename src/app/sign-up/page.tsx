"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: imageUrl || undefined,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign up error:", error);

      toast.error(
        error.message ||
          "অ্যাকাউন্ট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );

      setLoading(false);
      return;
    }

    if (data) {
      console.log("Sign up successful:", data);

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.push("/sign-in");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              সাইন আপ
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Bangla News 24-এ আপনার নতুন অ্যাকাউন্ট তৈরি করুন।
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={onSubmit}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                প্রোফাইল ছবি URL
              </label>

              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/profile.jpg"
                autoComplete="url"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-red-100"
              />

              <p className="mt-1.5 text-xs text-gray-400">
                একটি public image URL দিন।
              </p>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#b30000]"
              />

              <span className="leading-6">
                আমি Bangla News 24-এর{" "}
                <span className="font-medium text-[#b30000]">
                  শর্তাবলি
                </span>{" "}
                এবং{" "}
                <span className="font-medium text-[#b30000]">
                  গোপনীয়তা নীতি
                </span>{" "}
                মেনে চলতে সম্মত।
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#b30000] px-4 py-3 font-semibold text-white transition hover:bg-[#8f0000] focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Sign In */}
          <div className="mt-6 border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#b30000] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;