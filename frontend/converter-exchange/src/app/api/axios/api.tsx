/* eslint-disable no-undef */
import axios from "axios";
//Api Client
const apiClient = axios.create({
  baseURL: "http://localhost:5050",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// https://tecsota-assessment.vercel.app
export { apiClient };
