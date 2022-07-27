import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlLocalGuard } from './guards/local-gql.guard';
import { GqlJwtGuard } from './guards/jwt-gql.guard';
import { AuthResolver } from './graphql/auth.resolver';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GqlLocalGuard, GqlJwtGuard, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
