import { METHOD_TYPES } from "../../../constants/common/httpMethods";
import { LoginRequestDTO, LoginResponseDTO } from "../../../dtos/auth/dtos";
import useApi from "../../../hooks/useApi";
import { ROUTE } from "../../../routes/route";


export const useLoginApi = () => {
  const { request, loading } = useApi();

  const login = (dto: LoginRequestDTO) => {
    return request<LoginResponseDTO>({
      method: METHOD_TYPES.POST,
      url: ROUTE.AUTH_LOGIN,
      data: dto
    });
  };
  return { login, loading };
};
