import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserResolver } from './gateway/user.resolver';
import {
  UserMapper,
  UserRepository,
  IntroductionCodeMapper,
  IntroductionCodeRepository,
} from './persistance';

@Module({
  providers: [
    UserService,
    UserMapper,
    UserRepository,
    UserResolver,
    IntroductionCodeMapper,
    IntroductionCodeRepository,
  ],
  exports: [
    UserRepository
  ]
})
export class UserModule {}
