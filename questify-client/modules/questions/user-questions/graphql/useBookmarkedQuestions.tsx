import { useMockAPI } from "@utils/mock/useMockAPI";
import { useEffect } from "react";

export function useBookmarkedQuestions() {
  const [call, stats] = useMockAPI<void, {title:string,id:string}[]>({
    delay: 500,
    handler: () => {
      return new Array(30).fill({
        title: 'این یک سوال ذخیره شده است',
        id: 'some-fake'
      })
    }
  })
  
  useEffect(() => call(), []);

  return stats;
}