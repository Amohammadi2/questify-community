import { atom } from "recoil";
import { localStorageEffect } from "../../utils/recoil/local-storage.effect";

export interface IToken {
  access: string;
}

export const tokenAtom = atom<IToken | null>({
  key: 'auth-token',
  default: null,
  effects: [
    // local storage persistance enabled for this atom
    localStorageEffect('auth-token')
  ]
});

export interface IAccount {
  id: string;
  username: string;
}

export const accountAtom = atom<IAccount | null>({
  key: 'auth-account',
  default: null
});

export const isAuthCompleteAtom = atom<boolean>({
  key: 'auth-is-complete',
  default: false
});

