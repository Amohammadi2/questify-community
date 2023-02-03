import { APIStats } from "@utils/api-utils"
import { useMockAPI } from "@utils/mock/useMockAPI"
import { useEffect } from "react"
import { ICommuityProfile } from "../../interfaces/community-profile.interface"

export const useCommunityProfile = (communityId: string): APIStats<ICommuityProfile> => {
  const [fetchProfile, stats] = useMockAPI<void, ICommuityProfile>({
    delay: 400,
    handler: () => {
      return {
        name: 'انجمن هکر های ملاصدرا',
        description: 'ما اینجا جمع شدیم تا از سایت مدرسه به عنوان یک محیط تمرین برای اجرای عملیات های سایبری استفاده کنیم',
        profileImg: 'https://picsum.photos/100/100',
        nMembers: 10,
        visibility: 'PRIVATE'
      }
    }
  })

  useEffect(()=>{
    fetchProfile();
  }, [communityId])

  return stats;
}