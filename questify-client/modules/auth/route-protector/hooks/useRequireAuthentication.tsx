import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { accountAtom, isAuthCompleteAtom } from "../../auth-store/states";

export function useRequireAuthentication({ redirectUrl='/login' }={}) {

  const account = useRecoilValue(accountAtom);
  const isAuthComplete = useRecoilValue(isAuthCompleteAtom);
  const router = useRouter();

  useEffect(() => {
    if (isAuthComplete && !account && redirectUrl) {
      router.push(redirectUrl);
    }
  }, [isAuthComplete, account]);
}