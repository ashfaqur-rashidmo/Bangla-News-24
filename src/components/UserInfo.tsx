
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out error:", error);
      return;
    }

    console.log("Sign out successful");
  };

  // Session loading
  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-sm text-[#b30000]" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-end gap-3">
          {/* Profile Avatar */}
          <Link href="/profile" className="group">
            {user.image ? (
              <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-transparent transition group-hover:ring-[#b30000]">
                <img
                  src={user.image}
                  alt={user.name || "User profile"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b30000] text-lg font-bold text-white ring-2 ring-transparent transition group-hover:ring-red-200">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </Link>

          {/* User Name */}
          <div className="hidden items-center gap-3 sm:flex">
            <span className="max-w-32 truncate font-semibold text-neutral-800">
              {user.name}
            </span>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-red-50 hover:text-[#b30000]"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md px-2 py-2 text-sm font-medium text-neutral-600 transition hover:bg-red-50 hover:text-[#b30000] sm:hidden"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm md:absolute md:right-0 md:top-5 md:mt-0">
          <Link
            href="/sign-in"
            className="text-neutral-700 transition-colors hover:text-[#b30000]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-[#b30000] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#8f0000]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;