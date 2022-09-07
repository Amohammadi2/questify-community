import { useMockAPI } from "@utils/mock/useMockAPI";
import { IQuestion, IQuestionFilter } from "modules/questions/entities"
import { useEffect } from "react";

export function useSchoolQuestions(schoolId: string, filter: IQuestionFilter = 'new', searchTerm:string|null=null) {
  
  let title = {
    'new': 'این یک پست جدید است',
    'top': 'این یک پست محبوب است',
    'controversial': 'این یک پست بحث برانگیز است'
  }[filter];
  
  const sampleQuestion: IQuestion = {
    id: 'some-real-nice-id',
    title,
    content: 'یک توضیح کوتاه راجع به سوال برای خلاصه کردن مطلب', 
    author: {
      profileImageUrl: '',
      account: {
        id: 'ashakn-id',
        username: 'Ashkan'
      }
    }, 
    tags: ['ریاضی', 'فیزیک', 'هندسه', 'شیمی'],
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
  },[schoolId, filter, searchTerm]);

  return stats;
}