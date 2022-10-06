import { useMockAPI } from "@utils/mock/useMockAPI";
import { IQuestion, IQuestionFilter } from "modules/questions/entities"
import { IQuestionListHookParams } from "modules/questions/question-listing/interfaces";
import { useEffect } from "react";



export function useSchoolQuestions(schoolId: string, filters: IQuestionListHookParams) {
  
  const { category, searchTerm, selectedTags } = filters;
  
  const sampleQuestion: IQuestion = {
    id: 'some-real-nice-id',
    title: 'این یک پست خاص است: ' + category + searchTerm,
    content: 'یک توضیح کوتاه راجع به سوال برای خلاصه کردن مطلب', 
    author: {
      profileImageUrl: '',
      account: {
        id: 'ashakn-id',
        username: 'Ashkan'
      }
    }, 
    tags: selectedTags ? selectedTags : ['ریاضی', 'فیزیک', 'هندسه', 'شیمی'],
    score: 3
  };
  
  const [sendRequest, stats] =  useMockAPI<void, IQuestion[]>({
    delay: 1000,
    handler: () => {
      return new Array(30).fill(sampleQuestion);
    }
  })

  useEffect(() => {
    sendRequest();
  },[schoolId, category, searchTerm]);

  return stats;
}