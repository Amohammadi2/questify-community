import { atom } from "recoil";
import { localStorageEffect } from "../recoil-effects-utils/local-storage.effect";

interface IToken {
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

interface IAccount {
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

