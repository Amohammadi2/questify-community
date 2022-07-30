import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { User, UserDocument } from 'src/user-social/user.schema';
import { AskQuestionCommand } from '../commands/ask-question.command';
import { Question, QuestionCreateInput, QuestionDocument, QuestionObject } from '../schemas/question.schema';

@Resolver(()=>QuestionObject)
export class QaResolver {
  
  // injections
  constructor(
    private readonly commandBus: CommandBus,
  ) {}


  // mutations
  @UseGuards(GqlJwtGuard)
  @Mutation(() => QuestionObject)
  public async askQuestion(
    @Args('input') input: QuestionCreateInput,
    @CUser() user: UserDocument,
  ) {
    console.log(user)
    const result: QuestionDocument = await this.commandBus.execute(
      new AskQuestionCommand({ ...input, author: user.id }),
    );
    console.log(result);
    return result;
  }


  // relation resolvers
  @ResolveField()
  async tags(@Parent() question: QuestionDocument) {
    return question.tags.map(t=>t.name);
  }

  @ResolveField()
  async author(@Parent() question: QuestionDocument) {
    await question.populate('author');
    return question.author;
  }


}
