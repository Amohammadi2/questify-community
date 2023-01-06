import { IValidationResult } from "./validation-result.interface";

export const validateLength = (str: string, minLength: number, maxLength: number = Infinity): IValidationResult => {
  
  let isValid = true;
  const errors = [];

  if (str === null) {
    isValid = false;
  }

  else if (str.length < minLength) {
    isValid = false;
    errors.push('کمتر از ' + minLength  + ' کاراکتر نباید باشد');
  }

  else if (str.length > maxLength) {
    isValid = false;
    errors.push('بیشتر از ' + maxLength + ' کاراکتر نباید باشد')
  }
  
  return {
    isValid,
    errors,
    pending: false,
  }
}