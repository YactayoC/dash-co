import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://54.167.100.31:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
