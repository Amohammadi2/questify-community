import { useMockAPI } from "../../../utils/mock/useMockAPI";
import { IQuestionInput } from "../../entities";

export function useAskSchoolQuestion() {
  return useMockAPI<IQuestionInput, { id: string }>({
    delay: 2000,
    handler:({ content, title }) => {
      return {
        id: '343235-new-question'
      }
    }
  })
}
