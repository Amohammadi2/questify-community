import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question, QuestionDocument } from "src/qa/qa.schema";
import { AskQuestionCommand } from "./qa.commands";


@CommandHandler(AskQuestionCommand)
export class AskQuestionHandler implements ICommandHandler<AskQuestionCommand> {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>
  ) {}

  async execute(command: AskQuestionCommand) {
    return await this.questionModel.create({
      ...command.payload,
      tags: command.payload.tags.map(t=>({ name: t }))
    });
  }
}

export const handlers = [AskQuestionHandler];