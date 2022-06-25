import { atom } from "recoil";

interface IAuthUser {
  id: string;
  username: string;
  role: string;
  bio?: string;
  profileImageUrl?: string;
}

interface IAuthInfo {
  isAuth: boolean;
  token: string | null;
  user: IAuthUser | null;
}

export const authStore = atom<IAuthInfo>({
  default: {
    isAuth: false,
    user: null,
    token: null
  },
  key: 'auth-info'
})