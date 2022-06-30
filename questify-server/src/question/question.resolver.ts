import { UseGuards } from "@nestjs/common";
import { Args, Resolver } from "@nestjs/graphql";
import { AskQuestionInput } from "./dto/ask-question.input";
import { QuestionEntity } from "./question.entity";
import { QuestionService } from "./question.service";

@Resolver(() => QuestionEntity)
export class QuestionResolver {

  constructor(
    private readonly questionService: QuestionService
  ) {}

  @UseGuards() // Todo: implement Auth guard here
  public async askQuestion(@Args('input') askQuestionInput: AskQuestionInput) {

  }
}