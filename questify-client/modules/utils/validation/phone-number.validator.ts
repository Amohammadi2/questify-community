import { IValidationResult } from "./validation-result.interface";

const pattern = /0[0-9]{10}/;

export const validatePhoneNumber = (phoneNumber: string): IValidationResult => {
  
  const errors: string[] = [];

  if(!pattern.test(phoneNumber))
    errors.push('شماره تماس وارد شده معتبر نمی باشد');

  return {
    isValid: errors.length === 0,
    errors,
    pending: false
  };
}