import { useRecoilState } from "recoil";
import { ChComponent } from "../../../utils/ChComponent";
import { useVerifyToken } from "../graphql/useVerifyToken";
import { isAuthCompleteAtom, tokenAtom, accountAtom } from "../../auth-store/states";
import { useEffect } from "react";
import { ClientOnly } from "../../nextjs-utils/components/ClientOnly";

export const AuthenticatorRoot: ChComponent = ClientOnly(({ children }) => {
  
  const [isAuthComplete,setIsAuthComplete] = useRecoilState(isAuthCompleteAtom);
  const [authToken,] = useRecoilState(tokenAtom);
  const [account, setAccount] = useRecoilState(accountAtom);
  const { verifyToken, data, error, called } = useVerifyToken();
  
  useEffect(() => {
    // `isAuthComplete` is used to check if we have gone through the initial verification
    // step before or not. The token verification step can be skipped after the initial
    // load because the only way the token can change is through login or logout actions
    if (!isAuthComplete && authToken) {
      verifyToken(authToken.access).catch(()=>{});
    }
  // We have to declare a dependency on `authToken`, so that when recoil gains
  // access to the client's local storage and loads the authToken, we'll get notified
  }, [authToken]);

  useEffect(() => {
    if (called) {
      setIsAuthComplete(true);
      if (data) {
        setAccount(data);
      }
    }
  }, [data, error]);

  return (<>{children}</>);
});