import { useCallback, useState } from "react";

interface IMockAPIOpts <InputType, OutputType> {
  handler: (params: InputType) => OutputType | null | void;
  delay: number;
}

export function useMockAPI <InT, OutT> ({ handler, delay }: IMockAPIOpts<InT, OutT>) {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OutT | null>(null);
  const [error, setError] = useState(null);
  
  const reset = () => {
    setData(null);
    setError(null);
  }

  const handleCallback = useCallback((params: InT) => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setData(handler(params) || null);
      }
      catch(e) {
        setError((e as any).message);
      }
      setLoading(false);
    }, delay);
  }, [delay, handler])

  return [
    handleCallback, {
      data,
      error,
      loading,
      reset
    }
  ] as const;
}