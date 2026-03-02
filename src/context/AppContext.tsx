import { createContext, ReactNode, useEffect, useState } from "react";
import { AppConfigDTO } from "../dtos/app/dtos";
import { useAppApi } from "../hooks/useAppApi";
import authService from "../services/authService";
import { useAuthApi } from "../hooks/useAuthApi";
import ROUTES from "../navigation/routes";
import { useNavigate } from "react-router-dom";

export interface AppContextType {
  appConfig: AppConfigDTO | null;
  setAppConfig: (appConfig: AppConfigDTO | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { getBootstrapData } = useAppApi();
  const authApi = useAuthApi();
  const navigate = useNavigate();

  const [appConfig, setAppConfig] = useState<AppConfigDTO | null>(null);
  useEffect(() => {
    init();
  }, []);

  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const init = async () => {
    const accessToken = await authService.getAccessToken();

    if (!accessToken) {
      // navigate to login page, no token found
      navigateToLogin();
    } else {
      // validate token
      const accessTokenResponse = await authApi.validate(accessToken);

      if (accessTokenResponse.isOk) {
        // token is valid, fetch bootstrap data
        initData();
      } else {
        // try to refresh token
        const refreshToken = await authService.getRefreshToken();
        if (refreshToken) {
          // refresh token found, try to refresh access token
          const refreshTokenResponse = await authApi.refresh({ refreshToken });
          if (refreshTokenResponse.isOk && refreshTokenResponse.data) {
            // token refreshed successfully, save new tokens and fetch bootstrap data

            const newRefreshToken = refreshTokenResponse.data
              .refreshToken as string;
            const newAccessToken = refreshTokenResponse.data
              .accessToken as string;

            authService.saveTokens(newRefreshToken, newAccessToken);
            initData();
          } else {
            // refresh token is invalid, navigate to login page
            navigateToLogin();
          }
        } else {
          // no refresh token found, navigate to login page
          navigateToLogin();
        }
      }
    }
  };

  const initData = async () => {
    const response = await getBootstrapData();

    console.log("Bootstrap data response:", response);
    if (response.isOk) {
      setAppConfig(response.data);
    } else {
      console.error("Failed to fetch bootstrap data:", response.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        appConfig,
        setAppConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
