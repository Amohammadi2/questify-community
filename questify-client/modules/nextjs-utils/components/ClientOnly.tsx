import { ComponentType } from "react";
import { useRecoilValue } from "recoil";
import { isSSRCompleteAtom } from "../../ssr-state/states";

// only renders the wrapped component on the client side
export function ClientOnly <T> (Component: ComponentType<T>) {
  return (props: T) => {

    const isSSRComplete = useRecoilValue(isSSRCompleteAtom);

    if (!isSSRComplete) {
      return null;
    }

    return <Component {...props} />;
  }
}