import { useCallback } from "react";

import baseApiService, { RequestOptions } from "../services/baseApiService";
import type {
  ApiError,
  ApiResponse,
} from "../types/baseApiTypes";

export const useApi = () => {

  const request = useCallback(
    async <
      TResponse = unknown,
      TBody = unknown,
      TParams = Record<string, unknown>,
    >(
      options: RequestOptions<TBody, TParams>,
    ): Promise<ApiResponse<TResponse>> => {
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
      }
      return response;
    },
    [],
  );

  return {
    request,
  };
};

export default useApi;
