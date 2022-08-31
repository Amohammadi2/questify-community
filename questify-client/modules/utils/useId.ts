import { useState } from "react";

export function useId() {
  const [id, setId] = useState(0);

  return {
    id,
    next() {
      setId(id+1);
      return id+1;
    }
  }
}