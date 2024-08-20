import { $authToken } from "@/store/auth.store";
import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { GET_NOTIFS_QUERY } from "@/graphql/get-notifs";
import { GET_NOTIFS_COUNT_QUERY } from "@/graphql/get-notifs-count";
import { useCallback, useEffect } from "react";
import { $notificationsApi } from "@/apis";
import { client } from "@/apollo/client";
import { GetNotificationsQuery } from "@/gen/gql/graphql";
import { useLiveNotification } from "./useLiveNotifications";

/**
 * Provides a simple way to interact with the notifications api without the overhead
 * of thinking about the rest api endpoints and graphql query management.
 */
export function useNotifications() {
  useLiveNotification()
  const authToken = useRecoilValue($authToken)
  const notifsApi = useRecoilValue($notificationsApi)
  const notifsQuery = useQuery(GET_NOTIFS_QUERY, { variables: { after: null } })
  const notifsCountQuery = useQuery(GET_NOTIFS_COUNT_QUERY)

  // load notifs on user login or app start
  useEffect(() => {
    if (authToken) {
      notifsQuery.refetch()
      notifsCountQuery.refetch()
    }
  }, [authToken])

  const markSeen = useCallback(() => {
    notifsApi.notificationsMarkSeenCreate()
    client.cache.updateQuery({ query: GET_NOTIFS_COUNT_QUERY }, () => ({
      notificationCount: 0
    }))
    const { notifications } = client.readQuery({
      query: GET_NOTIFS_QUERY,
      variables: { after: null } 
    }) as unknown as GetNotificationsQuery
    notifications?.edges.forEach((e:any) => {
      client.cache.modify({
        id: client.cache.identify(e.node),
        fields: {
          seen() { return true }
        }
      })
    })
  }, [notifsApi, client, notifsQuery])

  const fetchMore = () => {
    console.log("FETCH MORE WAS CALLED")
    return notifsQuery.fetchMore({
      variables: {
        after: notifsQuery.data?.notifications?.pageInfo.endCursor
      }
    })
  }
  
  return {
    ...notifsQuery,
    count: notifsCountQuery.data?.notificationCount||0,
    markSeen,
    fetchMore,
    hasMore: notifsQuery.data?.notifications?.pageInfo.hasNextPage
  }
}