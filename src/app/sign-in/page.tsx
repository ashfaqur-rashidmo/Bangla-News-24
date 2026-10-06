"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign in error:", error);

      toast.error(
        error.message || "সাইন ইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );

      setLoading(false);
      return;
    }

    if (data) {
      console.log("Sign in successful:", data);

      toast.success("সাইন ইন সফল হয়েছে!");

      router.push("/");
      router.refresh();
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    if (socialLoading) return;

    setSocialLoading("google");

    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google Sign-In error:", error);

      toast.error(
        "গুগল সাইন ইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );

      setSocialLoading(null);
      return;
    }

    if (data) {
      console.log("Google Sign-In successful:", data);
    }
  };

  const handleGitHubSignIn = async () => {
    if (socialLoading) return;

    setSocialLoading("github");

    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.error("GitHub Sign-In error:", error);

      toast.error(
        "GitHub সাইন ইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );

      setSocialLoading(null);
      return;
    }

    if (data) {
      console.log("GitHub Sign-In successful:", data);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              সাইন ইন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Bangla News 24-এ আপনার অ্যাকাউন্টে প্রবেশ করুন।
            </p>
          </div>

          {/* Email/Password Form */}
          <form
            className="space-y-5"
            onSubmit={onSubmit}
          >
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
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#b30000] px-4 py-3 font-semibold text-white transition hover:bg-[#8f0000] focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={socialLoading !== null}
            className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google"
              ? "Google দিয়ে সাইন ইন হচ্ছে..."
              : "Sign In with Google"}
          </button>

          {/* GitHub */}
          <button
            type="button"
            onClick={handleGitHubSignIn}
            disabled={socialLoading !== null}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github"
              ? "GitHub দিয়ে সাইন ইন হচ্ছে..."
              : "Sign In with GitHub"}
          </button>

          {/* Sign Up */}
          <div className="mt-6 border-t border-gray-200 pt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#b30000] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;