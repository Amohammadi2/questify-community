import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { handlers } from './school-management.handlers';
import { resolvers } from './school-management.resolver';
import { models } from './school-management.schemas';

const mongooseModule = MongooseModule.forFeature(models);

@Module({
  imports: [mongooseModule, CqrsModule, AuthModule],
  exports: [mongooseModule],
  providers: [
    ...handlers,
    ...resolvers
  ]
})
export class SchoolManagementModule {}
