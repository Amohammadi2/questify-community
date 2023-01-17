import { APIStats } from "@utils/api-utils"
import { useMockAPI } from "@utils/mock/useMockAPI"
import { useEffect } from "react"
import { IEnvProfile } from "../interfaces/env-profile.interface"
import { IQuestionFeed } from "../interfaces/feed.type"

export const useEnvProfile = (opts: IQuestionFeed): APIStats<IEnvProfile> => {
  const [fetchProfile, stats] = useMockAPI<void, IEnvProfile>({
    delay: 800,
    handler: () => {
      switch(opts.feedType) {
        case "shared-space": 
          return {
            name: 'فضای اشتراکی',
            profileImg: null,
            description: 'فضایی برای تمام کاربران questify جهت پرسش و پاسخ',
            nMembers: Infinity,
            admins: [],
            visibility: 'PUBLIC',
          }
        case "school-space":
          return {
            name: 'مدرسه هیئت امنایی ملاصدرا',
            description: 'سلام دوستان اینجا ملاصدراست. همین',
            profileImg: 'https://picsum.photos/100/100',
            admins: [
              {
                name: 'مستر علی نژاد',
                profileImg: 'https://picsum.photos/100/100',
                userId: 'ieq89u3ijodasf98234'
              },
              {
                name: 'آقای رمضان پور',
                profileImg: 'https://picsum.photos/100/100',
                userId: 'sdfkow3q4j5tf98234'
              }
            ],
            nMembers: 154,
            visibility: 'PRIVATE',
          }
        case "community-space":
          return {
            name: 'انجمن هکر های ملاصدرا',
            description: 'ما اینجا جمع شدیم تا از سایت مدرسه به عنوان یک محیط تمرین برای اجرای عملیات های سایبری استفاده کنیم',
            profileImg: 'https://picsum.photos/100/100',
            nMembers: 10,
            visibility: 'PRIVATE',
            admins: [
              {
                name: 'اشکان محمدی',
                profileImg: 'https://picsum.photos/100/100',
                userId: 'o23qj4jsdfio24qriojdf'
              }
            ]
          }
      }
    }
  })

  useEffect(()=>{
    fetchProfile();
  }, [opts])

  return stats;
}