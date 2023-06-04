import { $tokenApi } from "@/apis";
import { ResponseError } from "@/gen";
import { $authToken, $isAuthTokenValidated } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export function useAuthentication() {
  const [loading ,setLoading ] = useState(true);
  const [tokenData, setTokenData] = useRecoilState($authToken);
  const [,setValidated] = useRecoilState($isAuthTokenValidated)
  const tokenApi = useRecoilValue($tokenApi);
  
  useEffect(() => {
    if (tokenData?.refresh)
    {
      tokenApi.tokenRefreshCreate({
        tokenRefreshRequest: { refresh: tokenData.refresh }
      })
      .then(res => {
        setTokenData(res)
        setValidated(true)
        console.log('auth response', res)
      })
      .catch(e => {
        if (e instanceof ResponseError)
        {
          setTokenData(null) // the refresh token is no longer usable, so just remove it
        }
      }) // neglect the rest of the errors
      .finally(() => setLoading(false))
    }
    else {
      setLoading(false)
    }
  }, [])

  return { loading };
}