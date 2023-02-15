import { useMockAPI } from "@utils/mock/useMockAPI"
import { useEffect } from "react"
import { ICommunityItem } from "../interfaces/community-item.interface"

export const useJoinedCommunitiesList = () => {
  const [fetchCommunities, stats] = useMockAPI<void, ICommunityItem[]>({
    delay: 500,
    handler: () => {
      return new Array<ICommunityItem>(15).fill({
        name: 'انجمن تحقیقات ملاصدرا',
        lastQuestionTitle: 'منظور از bottom sheet در Google MUI چیست؟',
        newQuestions: 23,
        profileImg: '/imgs/snow-fall.jpg',
        id: 'mlsdra-research-community'
      })
    }
  })

  useEffect(() => {
    fetchCommunities()
  }, [])

  return stats;
}