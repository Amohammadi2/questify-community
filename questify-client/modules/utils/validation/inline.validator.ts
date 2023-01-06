import { IValidationResult } from "./validation-result.interface"

// helps with easy declration of inline validators
export const validateInline = (condition: ()=>boolean, error:string): IValidationResult => {
  return {
    isValid: condition(),
    pending: false,
    errors: [error]
  }
}