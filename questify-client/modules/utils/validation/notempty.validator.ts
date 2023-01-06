import { IValidationResult } from "./validation-result.interface";

export const validateNotEmpty = (str: string): IValidationResult => {
  const isValid = str === null ? false : str.length === 0 ? false : true;
  return {
    isValid,
    pending: false,
    errors: [!isValid ? 'این فیلد نمی تواند خالی باشد' : null].filter(v=>v!=null)
  }
}