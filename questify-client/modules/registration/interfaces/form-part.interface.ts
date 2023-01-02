import { IFormState, IAction } from '../hooks/useRegistrationForm';

export interface IFormPart {
  state: IFormState;
  dispatch: (d: IAction) => void;
}