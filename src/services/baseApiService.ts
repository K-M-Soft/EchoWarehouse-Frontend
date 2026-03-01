import { ApiResponse } from "../types/baseApiTypes";
import authService from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7204";

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface RequestOptions<
  TBody = unknown,
  TParams = any,
> {
  method: RequestMethod;
  url: string;
  data?: TBody;
  params?: TParams;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

// Helper to build query string
function buildQueryString(params?: any | Record<string, unknown>): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

export const baseApiService = {
  async request<
    TResponse = unknown,
    TBody = unknown,
    TParams = any,
  >(
    options: RequestOptions<TBody, TParams>,
  ): Promise<ApiResponse<TResponse>> {
    try {
      const token = await authService.getAccessToken();
      const url = `${API_BASE_URL}/api${options.url}${buildQueryString(options.params as any)}`;
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const fetchOptions: RequestInit = {
        method: options.method,
        headers,
        signal: options.signal,
      };

      if (options.data && ["POST", "PUT", "PATCH"].includes(options.method)) {
        fetchOptions.body = JSON.stringify(options.data);
      }

      const response = await fetch(url, fetchOptions);
      
      let responseData: TResponse;
      let message = "Success";

      try {
        const json = await response.json();
        responseData = json.data || json;
        message = json.message || message;
      } catch {
        responseData = {} as TResponse;
      }

      if (!response.ok) {
        const status = response.status;
        
        if (status === 401) {
          authService.removeTokens();
        }

        const errorMessage = 
          status === 408 || status === 504 ? "UI_Error_Timeout" :
          !response.ok && !navigator.onLine ? "UI_Error_NetworkError" :
          message || "UI_Error_UnexpectedError";

        return {
          isOk: false,
          data: responseData,
          message: errorMessage,
        };
      }

      return {
        isOk: true,
        data: responseData,
        message,
      };
    } catch (err: unknown) {
      const error = err as Error;
      const isNetworkError = error.message.includes("Failed to fetch") || !navigator.onLine;
      const message = isNetworkError ? "UI_Error_NetworkError" : "UI_Error_UnexpectedError";

      return {
        isOk: false,
        data: {} as TResponse,
        message,
      };
    }
  },
};

export default baseApiService;
