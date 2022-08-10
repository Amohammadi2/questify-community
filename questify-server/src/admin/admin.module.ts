import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SchoolManagementModule } from 'src/school-management/school-management.module';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { handlers } from './admin.handlers';
import { AdminResolver } from './admin.resolver';

@Module({
  imports: [CqrsModule, UserSocialModule, SchoolManagementModule],
  providers: [
    AdminResolver,
    ...handlers
  ]
})
export class AdminModule {}
