import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { handlers } from './school-management.handlers';
import { resolvers } from './school-management.resolver';
import { models } from './school-management.schemas';

const mongooseModule = MongooseModule.forFeature(models);

@Module({
  imports: [mongooseModule, CqrsModule, forwardRef(() => UserSocialModule)],
  exports: [mongooseModule],
  providers: [...handlers, ...resolvers],
})
export class SchoolManagementModule {}
