"use client";
import Header from "@/src/components/header";
import React, { useEffect, useState } from "react";
import Drawer from "@/src/components/drawer";
import { useQuery } from "react-query";
import { getExchangeRates } from "../api/services/exchageRateService";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../global_redux/feature/drawe_slice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTransferRequest } from "../api/services/transferService";
import { useRouter } from "next/navigation";

function Page() {
  const [loading, setLoading] = useState(false);
  const [isCurrency, setCurrency] = useState<string>("");
  const [istransfer, setTransfer] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [isconvertedvalue, setConvertedValue] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const drawerState = useSelector((state: any) => state.drawer.status);
  const user = useSelector((state: any) => state.user);

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!user || !user._id || !user.token || !user.refreshtoken) {
      console.log("user", user)
      router.push("/");
    }
  }, [user, router]);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      currencyFrom: "",
      currencyTo: "",
      recipientname: "",
      recipeintemail: "",
      note: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .typeError("Amount must be a number")
        .required("Amount is required")
        .positive("Amount must be positive")
        .integer("Amount must be an integer"),
      currencyFrom: Yup.string().required("Currency is required"),
      currencyTo: Yup.string().required("Currency to convert is required"),
      recipientname: Yup.string().required("Recipient Name is required"),
      recipeintemail: Yup.string()
        .email("Invalid email address")
        .required("Recipient Email is required"),
      note: Yup.string().required("Note is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Add transfer request
        await addTransferRequest(
          values.recipientname,
          values.recipeintemail,
          Number(isconvertedvalue),
          Number(values.amount),
          selectedCurrency,
          isCurrency,
          values.note,
          user._id,
          user.email,
          user.token,
          user.refreshtoken
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Error in transfer");
        console.log(error);
      }
    },
  });

  const { data, isLoading, isError } = useQuery(
    ["exchangeRates", isCurrency],
    () => (isCurrency ? getExchangeRates(isCurrency) : Promise.resolve(null))
  );

  useEffect(() => {
    if (isCurrency && data && !isLoading && !isError) {
      const rate = data.conversion_rates[selectedCurrency];
      const amount = formik.values.amount;
      setConvertedValue((amount * rate).toFixed(2));
    }
  }, [
    isCurrency,
    data,
    isLoading,
    isError,
    selectedCurrency,
    formik.values.amount,
  ]);

  const toggleDrawer = () => {
    dispatch(setDrawer({ status: false }));
  };

  useEffect(() => {
    if (!isLoading && data && !isError) {
      setTransfer(false);
    } else {
      setTransfer(true);
    }
  }, [data]);

  return (
    <div
      className={`bg-white h-screen overflow-y-auto ${
        loading ? "pointer-events-none" : ""
      }`}
    >
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Header />
      <Drawer isOpen={drawerState} toggleDrawer={toggleDrawer} />
      <div className="h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
        <form onSubmit={formik.handleSubmit}>
          <div className="h-auto overflow-y-auto md: overflow-hidden ">
            <div className="flex flex-row items-center justify-center flex-wrap h-full w-screen">
              <div className="flex flex-col w-full  md:w-2/4">
                <p className="text-2xl font-bold text-black m-3">
                  Enter Amount & Select Currency
                </p>
                <div className="flex flex-row p-4">
                  <div className="w-screen ">
                    <input
                      type="text"
                      placeholder="Amount"
                      className="border border-gray-300 p-1.5 rounded-lg w-1/2 text-black m-2"
                      id="amount"
                      name="amount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.amount}
                    />
                    {formik.touched.amount && formik.errors.amount && (
                      <div className="text-red-500">{formik.errors.amount}</div>
                    )}
                  </div>
                  <div className="w-screen ">
                    <select
                      className="border border-gray-300 p-2 rounded-lg w-1/4 text-black m-2"
                      id="currencyFrom"
                      name="currencyFrom"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setCurrency(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.currencyFrom}
                    >
                      <option value="">Select Currency</option>
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                      <option value="AUD">AUD</option>
                      <option value="INR">INR</option>
                    </select>
                    {formik.touched.currencyFrom &&
                      formik.errors.currencyFrom && (
                        <div className="text-red-500">
                          {formik.errors.currencyFrom}
                        </div>
                      )}
                  </div>
                </div>
                <p className="text-2xl font-bold text-black m-3">
                  Select Currency to Get Conversion
                </p>
                <div className="justify-center items-center p-4">
                  <div className="w-screen ">
                    <select
                      className="border border-gray-300 p-2 rounded-lg w-1/4 text-black m-2"
                      id="currencyTo"
                      name="currencyTo"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setSelectedCurrency(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.currencyTo}
                    >
                      <option value="">Select Currency</option>
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                      <option value="AUD">AUD</option>
                      <option value="INR">INR</option>
                    </select>
                    {formik.touched.currencyTo && formik.errors.currencyTo && (
                      <div className="text-red-500">
                        {formik.errors.currencyTo}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-slate-50 m-4 rounded-lg w-full md:w-2/5 ">
                <p className="text-2xl font-bold text-black m-3">
                  Converted Amount in {isCurrency} -&gt; {selectedCurrency}
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
                      {isconvertedvalue && !isNaN(parseFloat(isconvertedvalue))
                        ? `${selectedCurrency}: ${isconvertedvalue}`
                        : `${selectedCurrency}: Please enter an amount`}
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
            {/* Transfer Money Section */}
            {formik.values.amount &&
              isconvertedvalue &&
              selectedCurrency &&
              isCurrency && (
                <div className="flex items-center justify-center h-auto bg-slate-50 md:bg-transparent">
                  <div className="flex flex-col flex-wrap w-screen md:w-8/12 justify-center items-center mt-2 mb-2 md:rounded-lg bg-slate-50 ">
                    <p className="text-2xl font-bold text-black m-3">
                      Transfer Money
                    </p>
                    <input
                      type="text"
                      placeholder="Recipient Name*"
                      className="border border-gray-300 p-1.5 rounded-lg w-8/12 text-black m-2"
                      id="recipientname"
                      name="recipientname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recipientname}
                    />
                    {formik.touched.recipientname &&
                      formik.errors.recipientname && (
                        <div className="text-red-500">
                          {formik.errors.recipientname}
                        </div>
                      )}
                    <input
                      type="email"
                      placeholder="Recepient Email*"
                      className="border border-gray-300 p-1.5 rounded-lg w-8/12 m-2 text-black"
                      id="recipeintemail"
                      name="recipeintemail"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recipeintemail}
                    />
                    {formik.touched.recipeintemail &&
                      formik.errors.recipeintemail && (
                        <div className="text-red-500">
                          {formik.errors.recipeintemail}
                        </div>
                      )}
                    <textarea
                      placeholder="Note*"
                      className="border border-gray-300 p-1.5 rounded-lg w-8/12 text-black m-2 h-40"
                      id="note"
                      name="note"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.note}
                    />
                    {formik.touched.note && formik.errors.note && (
                      <div className="text-red-500">{formik.errors.note}</div>
                    )}
                    <div className="flex flex-row justify-center items-center w-8/12 p-4">
                      <button
                        className="bg-blue-700 text-white p-2 rounded-lg w-full m-2 hover:bg-blue-500"
                        type="submit"
                        // disabled={loading}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
