import { Entity } from "@utils/api-utils";
import { useMockAPI } from "@utils/mock/useMockAPI";
import { IQuestionInput } from '../interfaces/question-input.interface';

export function useAskQuestion(qtype: 'community' | 'shared', communityId: string|null=null) {
  const [askQuestion, stats] = useMockAPI<IQuestionInput, Entity>({
    delay: 800,
    handler: (input) => {
      return { id: 'new-question-230jrdfa348u' };
    }
  })
  return [askQuestion, stats] as const;
}