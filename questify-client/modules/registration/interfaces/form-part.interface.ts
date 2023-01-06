import { IFormState, IAction } from '../hooks/useRegistrationForm';

export interface IFormPart <ValidationResultType> {
  state: IFormState;
  dispatch: (d: IAction) => void;
  validationResult: ValidationResultType;
}