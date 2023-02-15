import { APIStats } from "@utils/api-utils";
import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect, useState } from "react";
import { IQuestionFeed } from "../../interfaces/feed.type";
import { IQuestionPoster } from '../../../shared/interfaces/question-poster.interface';

export const useCommunityQuestions = (communityId: string):
  APIStats<IQuestionPoster[]> & { setSearchTerm: (s:string)=>void } =>
{
  const [searchTerm, setSearchTerm] = useState<string|null>('');
  const [fetchQuestions, stats] = useMockAPI<void, IQuestionPoster[]>({
    delay: 500,
    handler: () => {
      return new Array<IQuestionPoster>(15).fill({
        title: 'این یک سوال است: ' + (searchTerm ? "با سرچ از:" + searchTerm : ''),
        id: '23ijfaosi8qt94io-aqi34jrods984',
        author: {
          name: 'اشکان محمدی',
          profileImg: '/imgs/snow-fall.jpg',
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
              profileImg: '/imgs/snow-fall.jpg'
            }
          },
          {
            answerId: 'afdfjowijodsa-iojaefji',
            author: {
              name: 'Ilia Mohammadi',
              userId: 'ftkfgjhdfwef235gzadf-hghuhfzu',
              profileImg: '/imgs/snow-fall.jpg'
            }
          },
          {
            answerId: 'chhuirhgzurtoghdv-sjduiathugfiu',
            author: {
              name: 'Arshia Mohammadi',
              userId: 'gfjighfdshgo9hf-saugiuigrehigihjuh',
              profileImg: '/imgs/snow-fall.jpg'
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
  }, [communityId, searchTerm])

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