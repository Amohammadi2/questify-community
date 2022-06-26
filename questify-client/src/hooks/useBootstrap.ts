import { useEffect, useState } from "react";
import { useAuthLoader } from "./useAuthLoader";


export default function useBootstrap() {
  const [completed, setCompleted] = useState(false);
  const authCompleted = useAuthLoader();

  useEffect(() => {
    setCompleted(authCompleted);
  }, [authCompleted]);

  return completed;
}