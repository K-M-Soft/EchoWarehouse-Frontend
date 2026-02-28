import React from "react";

interface AppSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const AppSpinner: React.FC<AppSpinnerProps> = ({ size = "md", className = "" }) => {
  return (
    <div
      className={`${sizeMap[size]} border-2 border-transparent border-t-current rounded-full animate-spin ${className}`}
    />
  );
};

export default AppSpinner;
