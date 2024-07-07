"use client";
import Header from "@/src/components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Drawer from "@/src/components/drawer";
import { useQuery } from "react-query";
import { getExchangeRates } from "@/src/Api/services/exchageRateService";

function Page() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrency, setCurrency] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getExchangeRates(isCurrency),
  });

  //toggleDrawer function
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    console.log("data", data);
  };

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
      <button
        className="bg-slate-50 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-lg m-4"
        onClick={toggleDrawer}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <button onClick={() => setCurrency("USD")}>USD</button>
    </div>
  );
}

export default Page;
