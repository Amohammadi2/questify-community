import { useMockAPI } from "@utils/mock/useMockAPI"
import { IQuestionListHookParams } from "modules/questions/question-listing/interfaces";
import { useEffect } from "react";

export function useMyQuestions({ searchTerm, selectedTags }: IQuestionListHookParams) {

  const sampleQuestion = {
    title: 'این یکی از سوالات من است',
    id: 'something-fake'
  }

  const [call, stats] =  useMockAPI<void,{title:string,id:string}[]>({
    delay: 800,
    handler: () => {
      return new Array(30).fill(sampleQuestion);
    }
  })

  useEffect(() => call(), [searchTerm, selectedTags]);

  return stats;
}