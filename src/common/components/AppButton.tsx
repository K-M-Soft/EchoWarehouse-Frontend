import AppSpinner from "./AppSpinner";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const AppButton = ({ children, isLoading, ...props }: AppButtonProps) => {

  return (
    <button
      {...props}
      disabled={props.disabled || isLoading}
      className={`w-full h-11 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-glow mt-2 ${props.className}`}
    >
      {isLoading ? <AppSpinner size="sm" /> : children}
    </button>
  );
};

export default AppButton;
