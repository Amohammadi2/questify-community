import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { handlers } from './qa.handlers';
import { resolvers } from './qa.resolver';
import { models } from './qa.schema';

const mongoModule = MongooseModule.forFeature(models);

@Module({
  imports: [CqrsModule, mongoModule],
  exports: [mongoModule],
  providers: [...resolvers, ...handlers],
})
export class QaModule {}
