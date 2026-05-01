import React, {
  forwardRef,
  memo,
  useState,
} from "react";
import AppIcon from "./AppIcon";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AppValidator from "./AppValidator";
import { ErrorDetailDto } from "../../dtos/validation/dtos";
import { useValidate } from "../../hooks/useValidate";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  validator?: ErrorDetailDto[];
  isLoading?: boolean;
  validationPropName?: string;
  inputValidation?: ReturnType<typeof useValidate>;
}

export interface AppInputValidationRef {
  inputValidation: ReturnType<typeof useValidate>;
}

const AppInputComponent = (
  {
    isPassword,
    validator,
    validationPropName,
    isLoading,
    inputValidation,
    ...inputProps
  }: AppInputProps
) => {
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValidation) {
      inputValidation.bind.onChange(e);
    }
    inputProps.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValidation) {
      inputValidation.bind.onBlur();
    }
    inputProps.onBlur?.(e);
  };

  return (
    <>
      <div className="relative">
        <input
          {...inputProps}
          value={inputProps.value ?? inputValidation?.bind.value}
          onChange={handleChange}
          onBlur={handleBlur}
          type={
            isPassword ? (showPassword ? "text" : "password") : inputProps.type
          }
          disabled={isLoading || inputProps.disabled}
          className={`w-full h-11 px-4 bg-input border ${inputValidation?.error ? "border-red-500" : "border-border"} rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-150 ${isLoading ? "opacity-40" : ""} ${inputProps.className}`}
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
          <p className="text-red-500 text-sm mt-1">{inputValidation?.error}</p>
        ))}

      {/* backend error */}
      <AppValidator propName={validationPropName} validator={validator} />
    </>
  );
};

const AppInput = memo(AppInputComponent);

AppInput.displayName = "AppInput";

export default AppInput;
