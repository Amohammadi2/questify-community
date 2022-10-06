import { useMockAPI } from "@utils/mock/useMockAPI";
import { ITag } from "modules/questions/entities";
import { useEffect } from "react";

export function useSchoolQuestionTags(schoolId: string) {
  const [apiCall, stats] = useMockAPI<void, ITag[]>({
    delay: 400,
    handler: () => {
      return [
        {name: 'ریاضی', numberOfPosts: 44},
        {name: 'حسابان', numberOfPosts: 29},
        {name: 'عربی', numberOfPosts: 51},
        {name: 'شیمی', numberOfPosts: 52},
        {name: 'فیزیک', numberOfPosts: 82},
        {name: 'زمین شناسی', numberOfPosts: 22},
        {name: 'آمار', numberOfPosts: 32},
      ]
    }
  })

  useEffect(()=>apiCall(), []);

  return stats;
}