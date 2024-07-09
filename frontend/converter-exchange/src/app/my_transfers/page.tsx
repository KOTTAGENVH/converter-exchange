"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { signup } from "../../app/api/services/userService";
import Header from "@/src/components/header";
import Drawer from "@/src/components/drawer";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../global_redux/feature/drawe_slice";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer.status);

  const toggleDrawer = () => {
    dispatch(setDrawer({ status: false }));
  };

  return (
    <div
      className={`bg-white h-screen ${loading ? "pointer-events-none" : ""} md: overflow-hidden `}
    >
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Header />
      <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
      <div className="h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
        
       </div>
    </div>
  );
}
