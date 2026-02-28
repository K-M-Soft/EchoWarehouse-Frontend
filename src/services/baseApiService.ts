import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from "axios";
import { ApiError, ApiResponse } from "../types/baseApiTypes";
import authService from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7204";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await authService.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.data?.status;
    const isNetworkError = !error.response || error.message === "Network Error";
    const isTimeout = error.code === "ECONNABORTED";
    const fallbackMessage = isTimeout
      ? "UI_Error_Timeout"
      : isNetworkError
        ? "UI_Error_NetworkError"
        : "UI_Error_UnexpectedError";

    if (status === 401) {
      // TODO: implement navigation to login page
      authService.removeTokens();
    }

    const apiError: ApiError = {
      message:
        error.response?.data?.message || fallbackMessage || error.message,
      details: error.response?.data?.details || "NetworkError",
      status,
    };

    return Promise.reject(apiError);
  },
);

export type RequestMethod = Method;

export interface RequestOptions<
  TBody = unknown,
  TParams = Record<string, unknown>,
> {
  method: RequestMethod;
  url: string;
  data?: TBody;
  params?: TParams;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export const baseApiService = {
  client: apiClient,

  async request<
    TResponse = unknown,
    TBody = unknown,
    TParams = Record<string, unknown>,
  >(
    options: RequestOptions<TBody, TParams>,
  ): Promise<ApiResponse<TResponse>> {
    const config: AxiosRequestConfig = {
      method: options.method,
      url: options.url,
      data: options.data,
      params: options.params,
      headers: options.headers,
      signal: options.signal,
    };

    try {
      const response = await apiClient.request<TResponse>(config);
      const message =
        (response as unknown as { data?: { message?: string } })?.data
          ?.message || "Success";
      return {
        isOk: true,
        data: response.data,
        message,
      };
    } catch (err: unknown) {
      const error = err as ApiError;
      const errorData = error.details;
      const message = error.message;

      return {
        isOk: false,
        data: errorData as TResponse,
        message: message,
      };
    }
  },
};

export default baseApiService;
