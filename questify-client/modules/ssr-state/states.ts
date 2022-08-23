import { atom } from "recoil";

export const isSSRCompleteAtom = atom<boolean>({
  key: 'is-ssr-complete',
  default: false
});
