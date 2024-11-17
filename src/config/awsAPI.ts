import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://3.87.145.137:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.baseURL = config?.baseURL?.replace(/^https?:/, "http:");
    return config;
  },
  (error) => Promise.reject(error)
);
