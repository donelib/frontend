import axios, { AxiosError } from "axios";

export const api = axios.create()

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error instanceof AxiosError) {
    if (error?.response?.status === 401) {
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
});