
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-extrabold tracking-tight text-[#b30000] md:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-neutral-900 md:text-3xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500 md:text-base">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-[#b30000] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8f0000]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
