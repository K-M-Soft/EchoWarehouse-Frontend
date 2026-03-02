import { LoginProvider } from "./context/LoginContext";
import { useLoginContext } from "./hooks/useLoginContext";
import AppInput from "../../common/components/AppInput";
import AppButton from "../../common/components/AppButton";
import AppCard from "../../common/components/AppCard";
import AppIcon from "../../common/components/AppIcon";
import { BsArrowRight } from "react-icons/bs";
import { memo, useCallback} from "react";
import RequiredStar from "../../common/components/RequiredStar";
import AppLogo from "../../common/components/AppLogo";

// Static background — never re-renders
const LoginBackground = memo(() => (
  <>
    <div className="absolute inset-0 bg-gradient-glow" />
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
  </>
));

// Static header — never re-renders
const LoginHeader = memo(() => (
  <div className="text-center mb-8">
    <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-glow mb-4 p-1">
      <AppLogo className="text-primary-foreground" />
    </div>
    <h1 className="text-2xl font-bold tracking-tight">EchoWarehouse</h1>
    <p className="text-sm text-muted-foreground mt-1">
      Smart Warehouse Management System
    </p>
  </div>
));

export const Login = () => {
  const { login, loginInfo, onChangeLoginInfo, validator, loading } =
    useLoginContext();

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeLoginInfo("username", e.target.value),
    [onChangeLoginInfo],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeLoginInfo("password", e.target.value),
    [onChangeLoginInfo],
  );

  const onSignInPress = useCallback(() => {
    login();
  }, [login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <LoginBackground />

      <div className="relative z-10 w-full max-w-md mx-4 animate-slide-up">
        <LoginHeader />

        <AppCard>
          <h2 className="text-lg font-semibold mb-1">
            {"UI_Login_WelcomeBack"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {"UI_Login_SignInToContinue"}
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {"UI_Login_Username"}
                <RequiredStar />
              </label>
              <AppInput
                value={loginInfo?.username}
                validator={validator}
                isLoading={loading}
                validationPropName={"username"}
                onChange={handleUsernameChange}
                type="text"
                placeholder={"UI_Login_EnterYourUsername"}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {"UI_Login_Password"}
                <RequiredStar />
              </label>
              <AppInput
                value={loginInfo?.password}
                validator={validator}
                isLoading={loading}
                validationPropName={"password"}
                isPassword
                onChange={handlePasswordChange}
                placeholder={"UI_Login_EnterYourPassword"}
                className="pr-11"
              />
            </div>

            <AppButton isLoading={loading} onClick={onSignInPress}>
              {"UI_Login_SignIn"}
              <AppIcon icon={BsArrowRight} className="ml-2" />
            </AppButton>
          </div>
        </AppCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} EchoWarehouse - Smart Warehouse
          Management System
        </p>
      </div>
    </div>
  );
};

const LoginContextWrapper = () => (
  <LoginProvider>
    <Login />
  </LoginProvider>
);

export default LoginContextWrapper;