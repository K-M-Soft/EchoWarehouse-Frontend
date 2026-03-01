import { useCallback, useState } from "react";
import baseApiService, { RequestOptions } from "../services/baseApiService";
import type { ApiError, ApiResponse } from "../types/baseApiTypes";

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async <
      TResponse = unknown,
      TBody = unknown,
      TParams = Record<string, unknown>,
    >(
      options: RequestOptions<TBody, TParams>,
    ): Promise<ApiResponse<TResponse>> => {
      setLoading(true);
      let response: ApiResponse<TResponse>;
      try {
        response = await baseApiService.request<TResponse, TBody, TParams>(
          options,
        );
      } catch (err) {
        const apiError = err as ApiError;
        return {
          isOk: false,
          data: { error: apiError.message } as TResponse,
          message: apiError.message,
        };
      } finally {
        setLoading(false);
      }
      return response;
    },
    [],
  );

  return { request, loading };
};

export default useApi;