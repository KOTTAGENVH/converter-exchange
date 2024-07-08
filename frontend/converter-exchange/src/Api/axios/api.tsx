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

export { apiClient };

//https://tecsota-assessment.vercel.app