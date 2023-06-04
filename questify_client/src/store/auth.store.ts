import { TokenObtainPair } from "@/gen";
import { localStorageEffect } from "@/utils/local-storage.effect";
import { atom, selector } from "recoil";


export const $authToken = atom<TokenObtainPair|null>({
  key: 'auth-refresh-token',
  default: null,
  effects: [localStorageEffect('auth-token')]
})

export const $isAuthTokenValidated = atom<boolean>({
  key: 'is-auth-token-validated',
  default: false
})

export const $isAuthenticated = selector({
  key: 'is-authenticated',
  get: ({ get }) => get($authToken)?.refresh && get($isAuthTokenValidated),
})
