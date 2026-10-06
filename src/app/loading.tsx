import React from "react";

const Loading = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-[#b30000]" />

        <p className="mt-4 text-sm font-medium text-neutral-600 md:text-base">
          Loading, please wait...
        </p>
      </div>
    </main>
  );
};

export default Loading;
