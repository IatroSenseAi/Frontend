import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  }
  return (
    import.meta.env.VITE_API_BASE_URL_PROD ||
    "https://iatrosenseai.onrender.com/api"
  );
};


export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
