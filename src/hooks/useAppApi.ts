import { METHOD_TYPES } from "../constants/common/methods";
import { AppConfigDTO } from "../dtos/app/dtos";
import ROUTE from "../routes/route";
import useApi from "./useApi";

export const useAppApi = () => {
  const { request } = useApi();

  const getBootstrapData = () => {
    return request<AppConfigDTO>({
      method: METHOD_TYPES.GET,
      url: ROUTE.BOOTSTRAP
    });
  };
  return { getBootstrapData };
};
