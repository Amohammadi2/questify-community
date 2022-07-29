import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question } from "src/qa/schemas/question.schema";
import { AskQuestionCommand } from "../ask-question.command";

@CommandHandler(AskQuestionCommand)
export class KillDragonHandler implements ICommandHandler<AskQuestionCommand> {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>
  ) {}

  async execute(command: AskQuestionCommand) {
    return await this.questionModel.create(command.props);
  }
}
