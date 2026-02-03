import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config);
    }

    return config;
  },

  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch({ type: "isAllowed", payload: false });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;