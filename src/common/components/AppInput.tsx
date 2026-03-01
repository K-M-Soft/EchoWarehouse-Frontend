import React, { useState, memo, useEffect } from "react";
import AppIcon from "./AppIcon";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AppValidator from "./AppValidator";
import { ErrorDetailDto } from "../../dtos/validation/dtos";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
  validator?: ErrorDetailDto[];
  isLoading?: boolean;
  validationPropName?: string;
}


const AppInputComponent = ({
  isPassword,
  validator,
  validationPropName,
  isLoading,
  ...inputProps
}: AppInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<ErrorDetailDto[]>(validator || []);

  useEffect(() => {
    setErrors(validator || []);
  }, [validator]);
 
  const hasError =
    errors && errors.length > 0 &&
    errors.some(
      (error) => error.key === validationPropName 
    );
console.log(hasError)
console.log(validator)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputProps.onChange) {
      inputProps.onChange(e);
    }
  };

  return (
    <>
      <div className="relative">
        <input
          {...inputProps}
          onChange={onChange}
          type={
            isPassword ? (showPassword ? "text" : "password") : inputProps.type
          }
          disabled={isLoading || inputProps.disabled}
          className={`w-full h-11 px-4 bg-input border border-border disabled:opacity-40 ${hasError ? "border-red-500" : ""} rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${inputProps.className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:hover:text-muted-foreground disabled:cursor-not-allowed"
            disabled={isLoading || inputProps.disabled}
          >
            {showPassword ? (
              <AppIcon className="disabled:opacity-40" size={20} icon={IoMdEyeOff} />
            ) : (
              <AppIcon className="disabled:opacity-40" size={20} icon={IoMdEye} />
            )}
          </button>
        )}
      </div>
      
      {errors && errors.length > 0 && (
        <AppValidator
          propName={validationPropName}
          validator={errors}
        />
      )}
    </>
  );
};

const AppInput = memo(AppInputComponent) as typeof AppInputComponent;

export default AppInput;
