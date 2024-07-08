"use client";
import React, { useState } from "react";
import LoginHeader from "../../components/loginheader";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { verifyToken } from "../../app/api/services/userService";
import TokenInput from "../../components/tokeninput";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: Yup.object({
        token: Yup.string()
        .matches(/^[0-9]*$/, "Token must be a number")
        .required("Token is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await verifyToken(values.token).then((response) => {
          router.push("/resetpassword");
        });
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong. Please try again later.");
        }
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <div
      className={`bg-white h-screen ${loading ? "pointer-events-none" : ""} overflow-hidden`}
    >
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <LoginHeader />
      <div className="flex justify-center items-center h-full bg-darkerwhite">
        <div className="box-content h-max md:w-7/12 w-screen bg-white rounded-2xl md:mb-40 mb-40 ml-4 mt-16 mr-4 p-4 ">
          <a href="/forgotpassword" className="text-blue-500 text-sm mt-10 mb-4 ">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </a>
          <h1 className="text-left text-xl md:text-3xl font-bold text-black mt-4">
            Enter Token
          </h1>
          <hr className="mt-4" />
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mt-4">
              <label
                className="text-left text-lg md:text-xl text-black text-gray-400"
                htmlFor="email"
              >
                Token*
              </label>
              <TokenInput
                value={formik.values.token}
                handleChange={(value) =>
                  formik.setFieldValue("token", value)
                }
              />
              {formik.touched.token && formik.errors.token && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.token}
                </div>
              )}
            </div>
            {/* Submit Buttons */}
            <button
              type="submit"
              className={`w-full h-12 bg-blue-500 text-white rounded-lg mt-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
