import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserResolver } from './gateway/user.resolver';
import { UserMapper } from './persistance/user.mapper';

@Module({
  providers: [UserResolver, UserService, UserMapper]
})
export class UserModule {}
