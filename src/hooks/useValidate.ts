import { useMemo, useState } from "react";
import validatorUtil from "../utils/validator";

export interface UseValidateOptions {
  isRequired?: boolean;
  minlen?: number;
  maxlen?: number;
  maxnum?: number;
  isEmail?: boolean;
  customValidators?: Array<(val: any) => string | null>;
  initialValue?: any;
}

export function useValidate(options: UseValidateOptions = {}) {
  const [value, setValue] = useState(options.initialValue ?? "");
  const [isTouched, setIsTouched] = useState(false);

  const validateFn = useMemo(() => {
    const composedValidators: Array<(val: any) => string | null> = [];

    if (options.isRequired) {
      composedValidators.push(validatorUtil.validators.required());
    }
    if (typeof options.minlen === "number") {
      composedValidators.push(validatorUtil.validators.minLength(options.minlen));
    }
    if (typeof options.maxlen === "number") {
      composedValidators.push(validatorUtil.validators.maxLength(options.maxlen));
    }
    if (typeof options.maxnum === "number") {
      composedValidators.push(validatorUtil.validators.maxNumber(options.maxnum));
    }
    if (options.isEmail) {
      composedValidators.push(validatorUtil.validators.email());
    }
    if (options.customValidators?.length) {
      composedValidators.push(...options.customValidators);
    }

    return validatorUtil.compose(composedValidators);
  }, [
    options.isRequired,
    options.minlen,
    options.maxlen,
    options.maxnum,
    options.isEmail,
    options.customValidators,
  ]);

  const error = useMemo(() => validateFn(value), [value, validateFn]);

  return {
    value,
    setValue,
    error: isTouched ? error : null,
    isValid: isTouched ? !error : true,
    bind: {
      value,
      onChange: (e: any) => {
        setValue(e.target.value);
        setIsTouched(false);
      },
      onBlur: () => setIsTouched(true),
      validate: () => {
        setIsTouched(true);
        return validateFn(value);
      },
    },
  };
}