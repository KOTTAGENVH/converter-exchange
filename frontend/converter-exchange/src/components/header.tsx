"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setDrawer } from "../app/global_redux/feature/drawe_slice";
import { RootState } from "../app/global_redux/store";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    router.push("/home");
  };

  // toggleDrawer function
  const toggleDrawer = () => {
    dispatch(setDrawer({ status: true }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

 //Get current date
  const currentDate = new Date();

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-100 bg-opacity-30 backdrop-blur-lg p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <button
            className="bg-slate-50 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg "
            onClick={toggleDrawer}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div
          className="flex items-center justify-center flex-1  flex-shrink-0"
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
        <div className="text-black" >
        <p>{formatDate(currentDate)}</p>
    </div>
      </nav>
    </div>
  );
}

export default Header;
