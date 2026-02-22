import { METHOD_TYPES } from "../constants/common/httpMethods";
import { AppConfigDTO } from "../dtos/app/dtos";
import ROUTE from "../routes/route";
import useApi from "./useApi";

export const useAppApi = () => {
  const { request } = useApi();

  const getBootstrapData = () => {
    return request<AppConfigDTO>({
      method: METHOD_TYPES.GET,
      url: ROUTE.APP_BOOTSTRAP
    });
  };
  return { getBootstrapData };
};
