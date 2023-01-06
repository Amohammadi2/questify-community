export interface IValidationResult {
  isValid: boolean;
  pending: boolean;
  errors: Array<string>;
}