"use client";
import React, { useState } from "react";
import LoginHeader from "../../components/loginheader";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { resetPassword} from "../../api/services/userService";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
          "Password must contain at least one letter, one number, and one special character"
        )
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await resetPassword(
          values.email,
          values.password
        ).then((response) => {
          router.push("/");
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
      <div className="flex justify-center items-center h-full bg-darkerwhite ">
        <div className="box-content h-max md:w-7/12 w-screen bg-white rounded-2xl md:mb-40 mb-40 ml-4 mt-16 mr-4 p-4 ">
          <h1 className="text-left text-xl md:text-3xl font-bold text-black mt-4">
            Enter your new password
          </h1>
          <hr className="mt-4" />
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="mt-4">
              <label
                className="text-left text-lg md:text-xl text-black text-gray-400"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full h-12 p-4 border-b-2 text-black border-gray-200 mt-2 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
            {/* Password */}
            <div className="mt-4">
              <label
                className="text-left text-lg md:text-xl text-black text-gray-400"
                htmlFor="password"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="******************"
                  className="w-full h-12 p-4 border-b-2 border-gray-200 text-black mt-2 focus:outline-none focus:border-b-2 focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="mt-4">
              <label
                className="text-left text-lg md:text-xl text-black text-gray-400"
                htmlFor="confirm_password"
              >
                Confirm Password*
              </label>
              <div className="relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? "text" : "password"}
                  placeholder="******************"
                  className="w-full h-12 p-4 border-b-2 border-gray-200 text-black mt-2 focus:outline-none focus:border-b-2 focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.confirm_password}
                  </div>
                )}
            </div>
            {/* Submit Buttons */}
            <div className="flex items-center justify-center md:justify-between flex-wrap">
              <button
                type="button"
                className="w-52 h-12 bg-blue-500 text-white rounded-lg mt-8"
                onClick={() => router.push("/")}
                disabled={loading}
              >
                Sign in
              </button>
              <button
                type="submit"
                className={`w-52 h-12 bg-blue-500 text-white rounded-lg mt-8 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
