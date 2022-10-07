import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect } from "react";
import { ITag } from "../entities";


/**
 * @description gives you all the tags associated with a list
 */
export default function useQuestionTagList(listKind: 'school' | 'my-questions' | 'bookmarked' | 'community') {
  const [apiCall, stats] = useMockAPI<void, ITag[]>({
    delay: 450,
    handler() {
      return [
        {name: 'ریاضی', numberOfPosts: 79},
        {name: 'شیمی', numberOfPosts: 45},
        {name: 'حسابان', numberOfPosts: 133},
        {name: 'فیزیک', numberOfPosts: 56},
        {name: 'آمار', numberOfPosts: 34},
        {name: 'دینی', numberOfPosts: 8},
        {name: 'عربی', numberOfPosts: 12},
        {name: 'زبان', numberOfPosts: 22},
        {name: listKind, numberOfPosts: 1000}
      ]
    }
  })

  useEffect(()=>apiCall(), []);
  
  return stats;
}