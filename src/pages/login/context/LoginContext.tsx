import { createContext, ReactNode, useState } from "react";
import { useLoginApi } from "../hooks/useLoginApi";
import { LoginRequestDTO, LoginResponseDTO } from "../../../dtos/auth/dtos";
import { useLoadingContext } from "../../../hooks/useLoadingContext";
import { ErrorDetailDto } from "../../../dtos/validation/dtos";
import { ApiResponse } from "../../../types/baseApiTypes";

export interface LoginContextType {
  login: () => void;
  loginInfo: LoginRequestDTO;
  onChangeLoginInfo: (field: keyof LoginRequestDTO, value: string) => void;
  validator?: ErrorDetailDto[]; 
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const loginApi = useLoginApi();
  const loader = useLoadingContext();

  const [loginInfo, setLoginInfo] = useState<LoginRequestDTO>(
    new LoginRequestDTO(),
  );
  const [validator, setValidator] = useState<ErrorDetailDto[]>([]);

  const onChangeLoginInfo = (field: keyof LoginRequestDTO, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [field]: value }));
  };

  const login = async () => {
    loader.setLoading(true);

    const response = await loginApi.login(loginInfo);
    console.log(response);

    if (response.isOk) {
      const data: LoginResponseDTO = response.data;
      if (data.refreshToken && data.accessToken) {
        // save tokens to local storage
        //authService.saveTokens(data.refreshToken, data.accessToken);
      }
    } else {
      // handle login error, e.g. show error message
      const errors = response.data.details;
      setValidator(errors || [] );
    }
    loader.setLoading(false);
  };

  return (
    <LoginContext.Provider value={{ login, loginInfo, onChangeLoginInfo, validator }}>
      {children}
    </LoginContext.Provider>
  );
};
