import axios from "axios";
import Cookies from "js-cookie";
import { forceLogout } from "../services/helper/forcelogout";
import { toast } from "sonner";

const API = axios.create({
  baseURL: "https://news-blog-api.onrender.com/api",
});






API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // return Promise.reject(error);
    console.log("Axios interceptor error", error.response);
    toast.error(error.response.data.message)
    if (error.response && error.response.status === 401) {
      forceLogout();
    }
  }
);

export default API;
