import { IValidationResult } from "./validation-result.interface";

const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

export const validateEmail = (email: string): IValidationResult => {
  const isValid = pattern.test(email);
  const errors: string[] = [];
  if (!isValid) {
    errors.push('فرمت آدرس ایمیل معتبر نیست');
  }
  return {
    isValid,
    errors,
    pending: false
  };
}
