import { useMockAPI } from "@utils/mock/useMockAPI";
import { IQuestionListHookParams } from "modules/questions/question-listing/interfaces";
import { useEffect } from "react";

export function useBookmarkedQuestions({ searchTerm, selectedTags }: IQuestionListHookParams) {
  const [call, stats] = useMockAPI<void, {title:string,id:string}[]>({
    delay: 500,
    handler: () => {
      return new Array(30).fill({
        title: 'این یک سوال ذخیره شده است',
        id: 'some-fake'
      })
    }
  })
  
  useEffect(() => call(), [searchTerm, selectedTags]);

  return stats;
}