import { useReducer } from "react"


export interface IFormState {
  managerName: string|null;
  managerEmail: string|null;
  managerPhoneNumber: string|null;
  username: string|null;
  password: string|null;
  schoolName: string|null;
  schoolDescription: string|null;
}

export interface IAction {
  type: 'manager-name' | 'manager-email' | 'manager-phone-number' | 
        'username' | 'password' | 'school-name' | 'school-description';
  payload: string;
}

const reducer = (state: IFormState, action: IAction): IFormState => {
  switch(action.type) {
    case 'manager-name':
      return {...state, managerName: action.payload};
    case 'manager-email':
      return {...state, managerEmail: action.payload};
    case 'manager-phone-number':
      return {...state, managerPhoneNumber: action.payload};
    case 'username':
      return {...state, username: action.payload};
    case 'password':
      return {...state, password: action.payload};
    case 'school-name':
      return {...state, schoolName: action.payload};
    case 'school-description':
      return {...state, schoolDescription: action.payload};
  }
}

export const useRegistrationForm = () => {
  const [state, dispatch] = useReducer<(state: IFormState, action: IAction) => IFormState>(reducer, {
    managerName: null,
    managerEmail: null,
    managerPhoneNumber: null,
    username: null,
    password: null,
    schoolName: null,
    schoolDescription: null
  } as IFormState)

  return [state, dispatch] as const;
}