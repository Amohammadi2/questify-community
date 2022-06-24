import { createContext, ReactNode } from "react";

enum AuthUserRole {
  STUDENT, TEACHER, MANAGER
}

interface AuthUser {
  id: string;
  username: string;
  role: AuthUserRole
  bio?: string;
  profileImageUrl?: string;
}

export interface IAuthContextValue {
  isAuth: boolean;
  authToken: string | null;
  user: AuthUser | null
}

const authContext = createContext<IAuthContextValue>({
  isAuth: false,
  user: null,
  authToken: null
})

const { Provider } = authContext;

interface IAuthProvider { 
  children: ReactNode,
  value: IAuthContextValue
}

export function AuthProvider({ children, value }:IAuthProvider) {
  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
}