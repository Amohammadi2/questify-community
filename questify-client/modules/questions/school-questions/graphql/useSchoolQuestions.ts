import { useMockAPI } from "@utils/mock/useMockAPI";
import { IQuestionWD, IQuestionFilter } from "modules/questions/entities"
import { IQuestionListHookParams } from "modules/questions/question-listing/interfaces";
import { useEffect } from "react";
import { ISchoolQuestion } from "../interfaces/school-question.interface";



export function useSchoolQuestions(schoolId: string, filters: IQuestionListHookParams) {
  
  const { category, searchTerm, selectedTags } = filters;

  const sampleQuestion: ISchoolQuestion = {
    id: 'some-real-nice-id',
    title: 'این یک پست خاص است: ' + category + searchTerm,
    author: {
      profileImageUrl: '',
      account: {
        id: 'ashakn-id',
        username: 'Ashkan'
      }
    }, 
    tags: selectedTags,
    nLikes: 23,
    nComments: 43,
    nAnswers: 5,
    hasTextExplanation: true,
    hasVideoExplanation: true,
    isChallenge: true,
  };
  
  const [sendRequest, stats] =  useMockAPI<void, ISchoolQuestion[]>({
    delay: 1000,
    handler: () => {
      return new Array(30).fill(sampleQuestion);
    }
  })

  useEffect(() => {
    sendRequest();
  },[schoolId, category, searchTerm, selectedTags]);

  return stats;
}