import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { handlers } from './school-management.handlers';
import { resolvers } from './school-management.resolver';
import { models } from './school-management.schemas';

const mongooseModule = MongooseModule.forFeature(models);

@Module({
  imports: [mongooseModule, CqrsModule, AuthModule, UserSocialModule],
  exports: [mongooseModule],
  providers: [...handlers, ...resolvers],
})
export class SchoolManagementModule {}
