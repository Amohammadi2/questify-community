import { createContext } from "react";
import { ReactNode } from "react-markdown/lib/react-markdown";

interface IToolbarMenuContext {
  toggleMenu: () => void;
}

export const toolbarMenuContext = createContext<IToolbarMenuContext>({
  toggleMenu: () => null
})

interface IToolbarMenuContextProvider {
  value: IToolbarMenuContext;
  children: ReactNode | ReactNode[];
}

export default function ToolbarMenuContextProvider({ value, children } : IToolbarMenuContextProvider) {
  return (
    <toolbarMenuContext.Provider value={value}>
      {children}
    </toolbarMenuContext.Provider>
  );
}