import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.NODE_ENV === "development") {
    return import.meta.env.API_BASE_URL;
  }
  return import.meta.env.API_BASE_URL_PROD;
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
