import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://3.87.145.137:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
