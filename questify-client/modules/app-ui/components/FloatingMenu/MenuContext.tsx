import { createContext, ReactNode } from "react";

type MenuContextType = {
  close: () => void;
}

export const menuContext = createContext<MenuContextType>({
  close: () => null
})

interface IMenuContextProviderProps {
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

export default function MenuContextProvider({ onClose, children } : IMenuContextProviderProps) {
  return (
    <menuContext.Provider value={{ close: onClose }}>
      {children}
    </menuContext.Provider>
  )
}