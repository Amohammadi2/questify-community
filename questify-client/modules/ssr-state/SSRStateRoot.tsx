import { ChComponent } from "../../utils/ChComponent";
import { useSetSSRComplete } from "./hooks/useSetSSRComplete";

export const SSRStateRoot: ChComponent = ({ children }) => {
  
  useSetSSRComplete();
  
  return <>{children}</>;
}