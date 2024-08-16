import { $authToken } from "@/store/auth.store";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { GET_NOTIFS_QUERY } from "../../../graphql/get-notifs";
import { useEffect } from "react";

export function useNotifications() {
  const authToken = useRecoilValue($authToken)
  const graphqlState = useQuery(GET_NOTIFS_QUERY, { variables: { after: null } })

  useEffect(() => {
    if (authToken) {
      graphqlState.refetch()
      console.log("auth token detectd, refetching")
    }
  }, [authToken])
  
  return {...graphqlState}
}