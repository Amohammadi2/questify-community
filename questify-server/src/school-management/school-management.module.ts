import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { handlers } from './commands';
import { models } from './database';

const mongooseModule = MongooseModule.forFeature(models);

@Module({
  imports: [mongooseModule, CqrsModule, forwardRef(() => UserSocialModule)],
  exports: [mongooseModule],
  providers: [...handlers],
})
export class SchoolManagementModule {}
