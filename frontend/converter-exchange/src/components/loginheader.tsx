"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function LoginHeader() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div>
      <nav className="flex justify-center items-center bg-white bg-opacity-30 backdrop-blur-lg p-2 h-20 shadow-lg">
        <div
          className="flex justify-center items-center text-white mr-6 overflow-hidden"
          onClick={handleLogoClick}
          style={{ cursor: "pointer", height: "80px" }}
        >
        <Image
            src="/converter.png"
            alt="CONVERTER-EXCHANGE"
            layout="intrinsic"
            width={120}
            height={20}
            style={{ borderRadius: "10%", cursor: "pointer"}}
            
          />
        </div>
      </nav>
    </div>
  );
}

export default LoginHeader;
