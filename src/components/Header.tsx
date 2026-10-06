
import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white">
      <div className="relative mx-auto max-w-[1560px] px-4 py-5 md:py-6">
        {/* Logo + Title + Date */}
        <div className="flex items-center justify-center gap-2.5">
          <Image
            src="/logo.webp"
            alt="Bangla News 24 logo"
            width={50}
            height={50}
            priority
            className="rounded-xl"
          />

          <div className="flex flex-col items-start leading-tight">
            <span className="text-2xl font-bold text-[#b30000] sm:text-3xl">
              Bangla News 24
            </span>

            <span
              className="text-xs text-neutral-500 sm:text-sm"
              suppressHydrationWarning
            >
              {date}
            </span>
          </div>
        </div>

        {/* Auth Buttons */}
      
         <UserInfo />
       
      </div>

      <Navlinks />
    </header>
  );
};

export default Header;