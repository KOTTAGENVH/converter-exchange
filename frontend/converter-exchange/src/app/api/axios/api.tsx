/* eslint-disable no-undef */
import axios from "axios";
//Api Client
const apiClient = axios.create({
  baseURL: "https://tecsota-assessment.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// https://tecsota-assessment.vercel.app
// http://localhost:5050
export { apiClient };
