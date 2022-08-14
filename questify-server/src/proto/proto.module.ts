import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProtoController } from './proto.controller';

@Module({
  imports: [AuthModule],
  controllers: [ProtoController],
})
export class ProtoModule {}
