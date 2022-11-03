import { useContext } from "react";
import { toolbarMenuContext } from '../contexts/ToolbarMenuContext';

export function useToolbarMenuContext() {
  return useContext(toolbarMenuContext);
}