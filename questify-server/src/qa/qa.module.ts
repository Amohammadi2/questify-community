import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AskQuestionHandler } from './commands/handlers/ask-question.handler';
import { QaResolver } from './graphql/qa.resolver';
import { Question, questionSchema } from './schemas/question.schema';
import { Tag, tagSchema } from './schemas/tag.schema';

const mongoModule = MongooseModule.forFeature([
  { name: Question.name, schema: questionSchema },
  { name: Tag.name, schema: tagSchema }
])

@Module({
  imports: [CqrsModule,mongoModule],
  exports: [mongoModule],
  providers: [QaResolver, AskQuestionHandler]
})
export class QaModule {}
