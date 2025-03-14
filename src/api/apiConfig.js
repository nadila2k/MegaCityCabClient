import axios from "axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_VERSION = import.meta.env.VITE_API_VERSION;

const BASE_URL = `${VITE_API_BASE_URL}${VITE_API_VERSION}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const setHeaders = (config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token ", token);
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    setHeaders(config);
    return config;
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error", error.message);
    }
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
);

export default axiosInstance;
