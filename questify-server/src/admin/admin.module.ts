import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { handlers } from './admin.handlers';
import { AdminResolver } from './admin.resolver';

@Module({
  imports: [CqrsModule, UserSocialModule],
  providers: [
    AdminResolver,
    ...handlers
  ]
})
export class AdminModule {}
