import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
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
      privateKey: "#$sdfjiosd89f2y35DFjk",
      publicKey: "%#ji98$%&^$ji9"
    })
  ],
  providers: [AuthService, AuthResolver, AuthTokenGuard],
  exports: []
})
export class AuthModule {}
