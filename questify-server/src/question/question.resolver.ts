import { InternalServerErrorException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AskQuestionInput } from "./dto/ask-question.input";
import { QuestionEntity } from "./question.entity";
import { QuestionEntityMapper } from "./question.entity.mapper";
import { QuestionService } from "./question.service";

@Resolver(() => QuestionEntity)
export class QuestionResolver {

  constructor(
    private readonly questionService: QuestionService,
    private readonly questionEntityMapper: QuestionEntityMapper
  ) {}

  @UseGuards() // Todo: implement Auth guard here
  @Mutation(() => QuestionEntity)
  public async askQuestion(@Args('input') askQuestionInput: AskQuestionInput): Promise<QuestionEntity> {
    const question = await this.questionService.askQuestion(askQuestionInput);
    if (question == "create-failed")
      throw new InternalServerErrorException("Couldn't save the question into db");
    return this.questionEntityMapper.toEntity(question);
  }
}