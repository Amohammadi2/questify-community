import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect, useState } from "react";
import { ICompactQuestion } from "../interfaces/compact-question.interface";
import { QList } from "../interfaces/QList.type";

export const useQuestionList = (type: QList) => {

  const [searchTerm, setSearchTerm] = useState<string|null>(null);

  const [fetchList, stats] = useMockAPI<void, ICompactQuestion[]>({
    delay: 800,
    handler: () => {
      return new Array<ICompactQuestion>(100).fill({
        title: 'وارون فرم کلی معادله درجه دو چه به چه شکل می باشد؟: ' + type,
        author: {
          name: type === "asked" ? 'اشکان محمدی' : 'علی امینی',
          profileImg: '/imgs/snow-fall.jpg',
          userId: '24589435ja04-afjdfwh9ujhgo6'
        },
        date: new Date(),
        id: '24joiadsf084j-a9j9h49ja',
        nAnswers: 3,
        tags: ['#آمار', '#فیزیک', '#حسابان', '#هندسه'],
      })
    }
  })

  useEffect(() => {
    fetchList();
  }, [type, searchTerm])

  return {
    ...stats,
    setSearchTerm(searchTerm: string) {
      setSearchTerm(searchTerm);
    }
  };
}