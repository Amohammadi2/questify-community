import { Module } from '@nestjs/common';
import { UserSocialModule } from 'src/user-social/user-social.module';
import { ProtoController } from './proto.controller';

@Module({
  imports: [UserSocialModule],
  controllers: [ProtoController]
})
export class ProtoModule {}
