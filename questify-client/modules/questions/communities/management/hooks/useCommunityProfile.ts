import { APIStats } from "@utils/api-utils"
import { useMockAPI } from "@utils/mock/useMockAPI"
import { useEffect } from "react"
import { ICommuityProfile } from "../../interfaces/community-profile.interface"

export const useCommunityProfile = (communityId: string): APIStats<ICommuityProfile> => {
  const [fetchProfile, stats] = useMockAPI<void, ICommuityProfile>({
    delay: 400,
    handler: () => {
      return {
        name: 'انجمن تحقیقات ملاصدرا',
        description: 'واحد دانش‌آموزی علمی-فناوری-سایبری دبیرستان ملاصدرا',
        profileImg: '/imgs/snow-fall.jpg',
        nMembers: 10,
        visibility: 'PRIVATE',
        id: 'mlsdra-research-community'
      }
    }
  })

  useEffect(()=>{
    fetchProfile();
  }, [communityId])

  return stats;
}