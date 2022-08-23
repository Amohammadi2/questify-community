import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isSSRCompleteAtom } from "../states";

export function useSetSSRComplete() {
  const setIsSSRComplete = useSetRecoilState(isSSRCompleteAtom);

  useEffect(() => {
    setIsSSRComplete(true);
  }, []);
}