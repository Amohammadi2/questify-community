import { IValidationResult } from "./validation-result.interface";

export const validatePassword = (password: string): IValidationResult => {
  
  const errors: string[] = [];
  
  if (password === null || password.length < 8) 
    errors.push('رمز عبور باید حداقل 8 کاراکتر داشته باشد');

  return {
    isValid: errors.length === 0,
    errors,
    pending: false
  };
}