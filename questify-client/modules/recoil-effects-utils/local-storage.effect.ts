import { isSSRCompleteAtom } from "../ssr-state/states";

export function localStorageEffect(key: string) {
  return ({ onSet, setSelf, getPromise }) => {
    getPromise(isSSRCompleteAtom).then(() => {
      const persistedState = localStorage.getItem(key);

      if (persistedState)
        setSelf({ access: persistedState });

      onSet(newVal => {
        if (newVal)
          localStorage.setItem(key, newVal?.access);

        else
          localStorage.removeItem(key);
      });
    });
  };
}
