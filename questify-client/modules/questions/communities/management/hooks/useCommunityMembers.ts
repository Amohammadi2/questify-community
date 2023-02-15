import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect } from "react";
import { IMemberSummery } from "../interfaces/member-summery.interface";


export function useCommunityMembers(communityId: string) {

  const  [fetchMembers, stats] = useMockAPI<void, IMemberSummery[]>({
    delay: 800,
    handler: () => {
      return new Array(25).fill({
        name: 'اشکان محمدی',
        profileImg: '/imgs/snow-fall.jpg',
        userId: 'asjdoifjwioe8d-43iojasdfi',
        score: 345
      })
    }
  })
  
  useEffect(() => {
    fetchMembers();
  }, [communityId])

  return stats;
}