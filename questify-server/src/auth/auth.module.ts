import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './auth.entities';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature(config),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d'
      },
      verifyOptions: {
        ignoreExpiration: false
      }
    })
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
