import React, { useState, memo } from "react";
import AppIcon from "./AppIcon";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AppValidator from "./AppValidator";
import { ErrorDetailDto } from "../../dtos/validation/dtos";
import { useValidate, UseValidateOptions } from "../../hooks/useValidate";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  validator?: ErrorDetailDto[];
  isLoading?: boolean;
  validationPropName?: string;
  inputValidationOptions?: UseValidateOptions;
}

const AppInputComponent = ({
  isPassword,
  validator,
  validationPropName,
  isLoading,
  inputValidationOptions,
  ...inputProps
}: AppInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputValidation = useValidate(inputValidationOptions);

  return (
    <>
      <div className="relative">
        <input
          {...inputProps}
          {...inputValidation.bind}
          type={
            isPassword ? (showPassword ? "text" : "password") : inputProps.type
          }
          disabled={isLoading || inputProps.disabled}
          className={`w-full h-11 px-4 bg-input border ${inputValidation.error ? "border-red-500" : "border-border"} rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-150 ${isLoading ? "opacity-40" : ""} ${inputProps.className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 ${isLoading ? "opacity-40 cursor-not-allowed" : ""}`}
            disabled={isLoading || inputProps.disabled}
          >
            {showPassword ? (
              <AppIcon size={20} icon={IoMdEyeOff} />
            ) : (
              <AppIcon size={20} icon={IoMdEye} />
            )}
          </button>
        )}
      </div>

      {/* frontend validation error */}
      {!validator ||
        (validator && validator?.length < 1 && (
          <p className="text-red-500 text-sm mt-1">{inputValidation.error}</p>
        ))}

      {/* backend error */}
      <AppValidator propName={validationPropName} validator={validator} />
    </>
  );
};

const AppInput = memo(AppInputComponent) as typeof AppInputComponent;

export default AppInput;
