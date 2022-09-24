import { useMockAPI } from "@utils/mock/useMockAPI"
import { useEffect } from "react";

export function useMyQuestions() {

  const sampleQuestion = {
    title: 'این یکی از سوالات من است'
  }

  const [call, stats] =  useMockAPI<void,{title:string}[]>({
    delay: 800,
    handler: () => {
      return new Array(30).fill(sampleQuestion);
    }
  })

  useEffect(() => call(), []);

  return stats;
}