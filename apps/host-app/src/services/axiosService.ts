import { getFromLocalStorage } from "@/features/user/userSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ConfigCall = {
  params?: URLSearchParams;
};

type AxiosServiceProtocol = {
  get: <T>(path: string, config?: ConfigCall) => Promise<AxiosResponse<T>>;
  post: <T>(
    path: string,
    data?: unknown,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    path: string,
    data?: unknown,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  del: <T>(
    path: string,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
};

export const buildAxiosService = (): AxiosServiceProtocol => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3002",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== "undefined") {
        const token = getFromLocalStorage().token;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const get = <T>(
    path: string,
    config?: ConfigCall
  ): Promise<AxiosResponse<T>> => axiosInstance.get(path, config);

  const post = <T>(
    path: string,
    data?: unknown,
    headers?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.post(path, data, headers);

  const put = <T>(
    path: string,
    data?: unknown,
    headers?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.put(path, data, headers);

  const del = <T>(
    path: string,
    headers?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => axiosInstance.delete(path, headers);

  return {
    get,
    post,
    put,
    del,
  };
};
