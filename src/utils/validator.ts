export type ValidatorFn = (val: any) => string | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
  required: (message = "UI_Error_FieldIsRequired"): ValidatorFn => (val: any) => {
    if (val === null || val === undefined || String(val).trim() === "") {
      return message;
    }
    return null;
  },
  minLength: (min: number, message?: string): ValidatorFn => (val: any) => {
    if (val === null || val === undefined || String(val).length < min) {
      return message || `UI_Error_MinLength_${min}`;
    }
    return null;
  },
  maxLength: (max: number, message?: string): ValidatorFn => (val: any) => {
    if (val !== null && val !== undefined && String(val).length > max) {
      return message || `UI_Error_MaxLength_${max}`;
    }
    return null;
  },
  maxNumber: (max: number, message?: string): ValidatorFn => (val: any) => {
    if (val === null || val === undefined || String(val).trim() === "") {
      return null;
    }

    const parsedValue = Number(val);
    if (Number.isNaN(parsedValue) || parsedValue > max) {
      return message || `UI_Error_MaxNumber_${max}`;
    }
    return null;
  },
  email: (message = "UI_Error_InvalidEmailFormat"): ValidatorFn => (val: any) => {
    if (val === null || val === undefined || String(val).trim() === "") {
      return null;
    }
    if (!emailRegex.test(String(val))) {
      return message;
    }
    return null;
  },
};

const compose = (validatorList: ValidatorFn[]): ValidatorFn => {
  return (val: any) => {
    for (const validator of validatorList) {
      const error = validator(val);
      if (error) {
        return error;
      }
    }
    return null;
  };
};

const validatorUtil = {
  validators,
  compose,
  validateEmail: compose([
    validators.required("UI_Error_EmailIsRequired"),
    validators.email("UI_Error_InvalidEmailFormat"),
  ]),
  validatePassword: compose([
    validators.required("UI_Error_PasswordIsRequired"),
    validators.minLength(6, "UI_Error_PasswordMinLength_6"),
  ]),
  validateUsername: compose([
    validators.required("UI_Error_UsernameIsRequired"),
    validators.minLength(3, "UI_Error_UsernameMinLength_3"),
  ]),
};

export default validatorUtil;