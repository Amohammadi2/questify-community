import { useMockAPI } from "@utils/mock/useMockAPI"
import { IQuestionInput } from "../../questions/entities";

export function useSaveDraft() {
  return useMockAPI<IQuestionInput, { id: string }>({
    delay: 1500,
    handler() {
      return { id: 'sdfwre-new-draft' }
    }
  })
}