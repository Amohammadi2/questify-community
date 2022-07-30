import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question, QuestionDocument } from "src/qa/schemas/question.schema";
import { AskQuestionCommand } from "../ask-question.command";

// Todo: register as provider
@CommandHandler(AskQuestionCommand)
export class AskQuestionHandler implements ICommandHandler<AskQuestionCommand> {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async execute(command: AskQuestionCommand) {
    return await this.questionModel.create(command.payload);
  }
}
