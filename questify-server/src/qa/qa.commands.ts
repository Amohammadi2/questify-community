import { QuestionPayload } from "./qa.schema";

export class AskQuestionCommand {
  constructor(
    public readonly payload: QuestionPayload
  ) {}
}