import { createContext, ReactNode, useState } from "react";
import { useLoginApi } from "../hooks/useLoginApi";
import { LoginRequestDTO, LoginResponseDTO } from "../../../dtos/auth/dtos";
import { ErrorDetailDto } from "../../../dtos/validation/dtos";

export interface LoginContextType {
  login: () => void;
  loginInfo: LoginRequestDTO;
  onChangeLoginInfo: (field: keyof LoginRequestDTO, value: string) => void;
  validator?: ErrorDetailDto[]; 
  loading?: boolean;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const {login, loading} = useLoginApi();

  const [loginInfo, setLoginInfo] = useState<LoginRequestDTO>(
    new LoginRequestDTO(),
  );
  const [validator, setValidator] = useState<ErrorDetailDto[]>([]);

  const onChangeLoginInfo = (field: keyof LoginRequestDTO, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [field]: value }));
    if(validator && validator.length > 0) {
      setValidator((prev) => prev.filter((error) => error.key !== field));
    }
  };

  const _login = async () => {
    const response = await login(loginInfo);
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
  };

  return (
    <LoginContext.Provider value={{ login: _login, loginInfo, onChangeLoginInfo, validator, loading }}>
      {children}
    </LoginContext.Provider>
  );
};
