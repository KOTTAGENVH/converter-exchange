"use client";
import Header from "@/src/components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Drawer from "@/src/components/drawer";
import { useQuery } from "react-query";
import { getExchangeRates } from "@/src/Api/services/exchageRateService";
import { RootState } from "@/src/app/global_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../global_redux/feature/drawe_slice";

function Page() {
  const [loading, setLoading] = useState(false);
  const [isCurrency, setCurrency] = useState<string>("USD");
  const [istransfer, setTransfer] = useState<boolean>(false);

  const dispatch = useDispatch();
  const drawerState = useSelector((state: RootState) => state.drawer.status);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getExchangeRates(isCurrency),
  });

  //toggleDrawer function
  const toggleDrawer = () => {
    dispatch(setDrawer({ status: false }));
  };

  //set Currency
  const setCurrencyValue = (value: string) => {
    setCurrency(value);
  };

  //View transfer section
  useEffect(() => {
    if (!isLoading && data && !isError) {
      console.log("transfer1", istransfer);
      setTransfer(false);
      console.log("transfer2", istransfer);
    } else {
      console.log("transfer3", istransfer);
      setTransfer(true);
      console.log("transfer4", istransfer);
    }
  }, [data]);

  return (
    <div
      className={`bg-white h-screen overflow-y-auto ${
        loading ? "pointer-events-none" : ""
      }  `}
    >
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Header />
      <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
      <div className="h-auto  overflow-y-auto md: overflow-hidden">
        <div className="flex flex-row items-center justify-center flex-wrap w-screen">
          <div className="flex flex-col w-full md:w-2/4">
            <p className="text-2xl font-bold text-black m-3">
              Enter Amount and Select Currency
            </p>
            <div className="flex flex-row  p-4">
              <input
                type="text"
                placeholder="Amount"
                className="border border-gray-300 p-1.5 rounded-lg w-1/2 text-black m-2"
              />
              <select className="border border-gray-300 p-2 rounded-lg w-1/4 text-black m-2">
                <option value="Sri Lanka - LKR">LKR</option>
                <option value="USA - USD">USD</option>
                <option value="Australia - AUD">AUD</option>
                <option value="India - INR">INR</option>
              </select>
            </div>
            <p className="text-2xl font-bold text-black m-3">
              Select Currency to Get Conversion
            </p>
            <div className=" justify-center items-center p-4">
              <select className="border border-gray-300 p-2 rounded-lg w-1/4 text-black m-2">
                <option value="Sri Lanka - LKR">LKR</option>
                <option value="USA - USD">USD</option>
                <option value="Australia - AUD">AUD</option>
                <option value="India - INR">INR</option>
              </select>
            </div>
            <div className="flex flex-row justify-center items-center p-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-lg w-full m-2 hover:bg-blue-700"
                onClick={() => setCurrencyValue("USD")}
              >
                Convert
              </button>
            </div>
          </div>
          {/*Converted amount display*/}
          <div className="flex flex-col bg-slate-50 m-4 rounded-lg w-full md:w-2/5 md:ml-20">
            <p className="text-2xl font-bold text-black m-3">
              Converted Amount in AUD
            </p>
            {isError || (!data && !isLoading) ? (
              <div className="flex flex-row justify-center items-center p-4">
                <p className="text-2xl font-bold text-black m-3">
                  No Data Found
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full m-3">
                <p className="text-3xl font-bold text-black m-3">
                  AUD: {data?.conversion_rates.AUD}
                </p>
              </div>
            )}
            {isLoading && (
              <div className="flex flex-row justify-center items-center p-4">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 m-3" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center h-auto  bg-slate-50 md: bg-white ">
          <div className="flex flex-col flex-wrap w-screen md:w-8/12 justify-center items-center mt-2 mb-2 md:rounded-lg bg-slate-50">
            <p className="text-2xl font-bold text-black m-3">Transfer Money</p>
            <input
              type="text"
              placeholder="Recipient Name*"
              className="border border-gray-300 p-1.5 rounded-lg w-8/12 text-black m-2"
            />
            <input
              type="email"
              placeholder="Recepient Email*"
              className="border border-gray-300 p-1.5 rounded-lg w-8/12 m-2 text-black"
            />
            <textarea
              placeholder="Note*"
              className="border border-gray-300 p-1.5 rounded-lg w-8/12 text-black m-2 h-40"
            />
            <div className="flex flex-row justify-center items-center w-8/12 p-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-lg w-full m-2 hover:bg-blue-700"
                onClick={() => setCurrencyValue("USD")}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
