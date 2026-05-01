import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useLoginApi } from "../hooks/useLoginApi";
import { LoginRequestDTO, LoginResponseDTO } from "../../../dtos/auth/dtos";
import { ErrorDetailDto } from "../../../dtos/validation/dtos";

export interface LoginContextType {
  login: () => void;
  loginInfo: LoginRequestDTO;
  onChangeLoginInfo: (field: keyof LoginRequestDTO, value: string) => void;
  validator: ErrorDetailDto[];
  loading: boolean;
  setValidator: React.Dispatch<React.SetStateAction<ErrorDetailDto[]>>;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined,
);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { login: apiLogin, loading } = useLoginApi();

  const [loginInfo, setLoginInfo] = useState<LoginRequestDTO>(
    new LoginRequestDTO(),
  );
  const [validator, setValidator] = useState<ErrorDetailDto[]>([]);

  const onChangeLoginInfo = useCallback(
    (field: keyof LoginRequestDTO, value: string) => {
      setLoginInfo((prev) => ({ ...prev, [field]: value }));
      // Use functional update so we don't depend on `validator` in closure
      setValidator((prev) => {
        if (prev.length === 0) return prev; // return same reference if no change
        const filtered = prev.filter((error) => error.key !== field);
        return filtered.length === prev.length ? prev : filtered; // same ref if nothing was removed
      });
    },
    [], // ← stable! no dependencies on validator
  );

  const login = useCallback(async () => {
    const response = await apiLogin(loginInfo);

    if (response.isOk) {
      const data: LoginResponseDTO = response.data;
      if (data.refreshToken && data.accessToken) {
        // authService.saveTokens(data.refreshToken, data.accessToken);
      }
    } else {
      const errors = response.data.details;
      setValidator(errors || []);
    }
  }, [apiLogin, loginInfo]);

  const contextValue = useMemo(
    () => ({
      login,
      loginInfo,
      onChangeLoginInfo,
      validator,
      loading,
      setValidator,
    }),
    [login, loginInfo, onChangeLoginInfo, validator, loading],
  );

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
