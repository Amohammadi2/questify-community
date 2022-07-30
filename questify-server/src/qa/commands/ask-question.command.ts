import { QuestionPayload } from "../schemas/question.schema";

export class AskQuestionCommand {
  constructor(
    public readonly payload: QuestionPayload
  ) {}
}