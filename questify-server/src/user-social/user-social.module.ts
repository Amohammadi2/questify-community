import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolManagementModule } from 'src/school-management/school-management.module';

import { handlers } from "./commands";
import { schemas } from './database';

const mongooseModule = MongooseModule.forFeature(schemas);

@Module({
  imports: [mongooseModule, CqrsModule, forwardRef(() => SchoolManagementModule)],
  providers: [...handlers],
  exports: [mongooseModule],
})
export class UserSocialModule {}
