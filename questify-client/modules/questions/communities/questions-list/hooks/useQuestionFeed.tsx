import { APIStats } from "@utils/api-utils";
import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect, useState } from "react";
import { IQuestionFeed } from "../../interfaces/feed.type";
import { IQuestionPoster } from '../../interfaces/question-poster.interface';

export const useQuestionFeed = (feedParams: IQuestionFeed):
  APIStats<IQuestionPoster[]> & { setSearchTerm: (s:string)=>void } =>
{
  const [searchTerm, setSearchTerm] = useState<string|null>('');
  const [fetchQuestions, stats] = useMockAPI<void, IQuestionPoster[]>({
    delay: 500,
    handler: () => {
      return new Array<IQuestionPoster>(50).fill({
        title: 'این یک سوال است از: ' + feedParams.feedType + (searchTerm ? "با سرچ از:" + searchTerm : ''),
        id: '23ijfaosi8qt94io-aqi34jrods984',
        author: {
          name: 'اشکان محمدی',
          profileImg: 'https://picsum.photos/100/100',
          userId: 'qk23joiqsfjzo4q38f'
        },
        nAnswers: 3,
        nComments: 5,
        recentAnswers: [
          {
            answerId: 'asdijfwoi2-soiadjfwij',
            author: {
              name: 'Ashkan Mohammadi',
              userId: 'aq3jio2a8s9dfj-asdf2',
              profileImg: 'https://picsum.photos/100/100'
            }
          },
          {
            answerId: 'afdfjowijodsa-iojaefji',
            author: {
              name: 'Ilia Mohammadi',
              userId: 'ftkfgjhdfwef235gzadf-hghuhfzu',
              profileImg: 'https://picsum.photos/100/100'
            }
          },
          {
            answerId: 'chhuirhgzurtoghdv-sjduiathugfiu',
            author: {
              name: 'Arshia Mohammadi',
              userId: 'gfjighfdshgo9hf-saugiuigrehigihjuh',
              profileImg: 'https://picsum.photos/100/100'
            }
          },
        ],
        scores: 13,
        tags: ['فیزیک', 'آمار', 'شیمی', 'حسابان']
      })
    }
  })

  useEffect(() => {
    fetchQuestions();
  }, [feedParams, searchTerm])

  return {
    ...stats,
    getNext() {
      alert('درحال گرفتن ادامه لیست')
    },
    setSearchTerm(searchTerm: string|null) {
      setSearchTerm(searchTerm);
    }
  }
}