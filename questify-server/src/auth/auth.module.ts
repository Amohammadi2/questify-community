import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET } from './auth.constants';
import { config } from './auth.entities';
import { AuthTokenGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

const mongooseModule = MongooseModule.forFeature(config);

@Module({
  imports: [
    mongooseModule,
    JwtModule.register({
      signOptions: {
        algorithm: 'HS512',
        expiresIn: '1d',
      },
      verifyOptions: {
        ignoreExpiration: false
      },
      privateKey: JWT_SECRET,
      publicKey: JWT_SECRET
    })
  ],
  providers: [AuthService, AuthResolver, AuthTokenGuard],
  exports: []
})
export class AuthModule {}
