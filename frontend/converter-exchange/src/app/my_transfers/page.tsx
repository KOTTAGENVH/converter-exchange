"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import Header from "@/src/components/header";
import Drawer from "@/src/components/drawer";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../global_redux/feature/drawe_slice";
import { getTransferHistory } from "../api/services/transferService";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const drawerState = useSelector((state: any) => state.drawer.status);
  const user = useSelector((state: any) => state.user);

  // // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!user || !user._id || !user.token || !user.refreshtoken) {
      router.push("/");
    }
  }, [user, router]);

  // Fetch transfer history
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getTransferHistory(user._id, user.email, user.token, user.refreshtoken),
  });

  const toggleDrawer = () => {
    dispatch(setDrawer({ status: false }));
  };
console.log("data", data)
  return (
    <div
      className={`bg-white h-screen ${
        loading ? "pointer-events-none" : ""
      } md: overflow-hidden `}
    >
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Header />
      <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
      <div className="h-screen bg-gradient-to-b from-cyan-50 to-blue-100"></div>
    </div>
  );
}
