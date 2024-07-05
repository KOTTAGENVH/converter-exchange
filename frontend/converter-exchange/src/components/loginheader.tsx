"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'

function LoginHeader() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap  bg-opacity-30 backdrop-blur-lg p-2">
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
            style={{ borderRadius: "50%" }}
          />
          <span className="font-semibold text-xl tracking-tight ml-6 ">
            Dino AR
          </span>
        </div>
        <div>
          <a
            href="/legal"
            className="inline-block text-sm px-4 py-2  text-xl items-end	text-end justify-end mt-2 "
          >
            <p>T&C</p>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default LoginHeader;
