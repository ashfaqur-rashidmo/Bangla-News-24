"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;



  const [show, setShow] = useState(false);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out error:", error);
      return;
    }

    console.log("Sign out successful");
  };

  

  // Loading state
  if (isPending) {
    return (
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4">
        <span className="loading loading-spinner loading-lg text-[#b30000]" />
      </main>
    );
  }

   if (!user) {
    redirect("/sign-in");
  }

  // No authenticated user
  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-[#b30000]">
            !
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Sign in required
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনার প্রোফাইল দেখতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন করুন।
          </p>

          <Link
            href="/sign-in"
            className="mt-6 inline-block rounded-lg bg-[#b30000] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f0000]"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const UpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUserData = Object.fromEntries(formData.entries()) as {name: string; imageUrl: string};
    
    // const name = formData.get("name") as string;
    // const imageUrl = formData.get("imageUrl") as string; 
    // const { data, error } = await authClient.updateUser({ name, image: imageUrl, }); 
    // if (error) { 
    //   console.error("Profile update error:", error); 
    //   return; 
    // }
    
    console.log("Updating profile with data:", newUserData);

    await authClient.updateUser({
      ...newUserData,
    });
  }

  const handleFormShow = () => {
    setShow(!show);
  }

  return (
    <main className="px-4 py-8 sm:py-4">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl text-center font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover/Header */}
          <div className="h-32 bg-[#b30000] sm:h-40" />

          {/* Profile Information */}
          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            {/* Avatar */}
            <div className="-mt-14 mb-5 sm:-mt-16 flex items-center justify-center">
              {user.image ? (
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-md sm:h-32 sm:w-32">
                  <Image
                  height={128}
                  width={128}
                    src={user.image}
                    alt={user.name || "User profile"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#b30000] text-4xl font-bold text-white shadow-md sm:h-32 sm:w-32">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                {user.name || "User"}
              </h2>

          
            </div>

            <button className="btn" onClick={handleFormShow}>Edit Profile</button>

            {/* Divider */}
            <div className="my-7 border-t border-gray-200" />

            {/* Account Information */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Account Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Name
                  </p>

                  <p className="mt-2 font-medium text-gray-800">
                    {user.name || "Not provided"}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <p className="mt-2 break-all font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>

                {/* Email Verification */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email Status
                  </p>

                  <div className="mt-2">
                    {user.emailVerified ? (
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Not Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Account ID */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Account ID
                  </p>

                  <p className="mt-2 break-all font-mono text-sm text-gray-700">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>
             
             
            {show && <form
            className="space-y-5"
            onSubmit={UpdateProfile}
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


            {/* Submit */}
            <button
              type="submit"
              
              className="w-full rounded-lg bg-[#b30000] px-4 py-3 font-semibold text-white transition hover:bg-[#8f0000] focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
             Update Profile
            </button>
          </form>
            }
            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row">
              <Link
                href="/"
                className="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-[#b30000] hover:text-[#b30000]"
              >
                Back to Home
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-[#b30000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8f0000]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;