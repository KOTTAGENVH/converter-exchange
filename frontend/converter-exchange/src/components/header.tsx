"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/mytransactions");
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-100 flex-row bg-opacity-30 backdrop-blur-lg p-2">
        <div
          className="flex items-center flex-shrink-0 text-white mr-6 "
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <Image
            src="/converter.png"
            alt="T-Rex"
            width={60}
            height={100}
            style={{ borderRadius: "10%" }}
          />
        </div>
        <div style={{ cursor: "pointer" }}>
          <span className="font-semibold text-xl tracking-tight ml-6 ">
            Converter-Exchange
          </span>
        </div>
        <div
         style={{ cursor: "pointer" }}
         onClick={handleProfileClick}
         >
          <Image
            src="/profilepic.png"
            alt="CONVERTER-EXCHANGE"
            width={60}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </nav>
    </div>
  );
}

export default Header;
