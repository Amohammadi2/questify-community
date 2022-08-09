import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { AdminResolver } from './admin.resolver';

@Module({
  imports: [CqrsModule, UserSocialModule],
  providers: [AdminResolver]
})
export class AdminModule {}
