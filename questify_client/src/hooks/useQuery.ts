import { useEffect } from "react";
import { useApi } from "./useApi";

export function useQuery<T extends () => Promise<any>>(callback: T) {
  const [call, states] = useApi(callback)

  useEffect(() => {}, [callback])
}