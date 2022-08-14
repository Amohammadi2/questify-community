import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { AskQuestionCommand } from '../../qa/qa.commands';
import {
  QuestionDocument,
} from '../../qa/qa.schema';
import {
  QuestionCreateInput,
  QuestionObject
} from "./qa.objects";
import { UserAccountDoc } from 'src/auth/database/user-account';

@Resolver(() => QuestionObject)
export class QaResolver {
  // injections
  constructor(private readonly commandBus: CommandBus) {}

  // mutations
  @UseGuards(GqlJwtGuard)
  @Mutation(() => QuestionObject)
  public async askQuestion(
    @Args('input') input: QuestionCreateInput,
    @CUser() user: UserAccountDoc,
  ) {
    const result: QuestionDocument = await this.commandBus.execute(
      new AskQuestionCommand({ ...input, author: user.id }),
    );
    return result;
  }
}

@Resolver(() => QuestionObject)
export class QuestionResolver {
  // relation resolvers
  @ResolveField()
  async tags(@Parent() question: QuestionDocument) {
    return question.tags.map((t) => t.name);
  }

  @ResolveField()
  async author(@Parent() question: QuestionDocument) {
    await question.populate('author'); // Todo: implement a data loader here
    return question.author;
  }
}
