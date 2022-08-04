import { Global, Module } from '@nestjs/common';
import { AuthService, RoleCheckService } from './auth.service';
import { UserSocialModule } from '../user-social/user-social.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlLocalGuard } from './guards/local-gql.guard';
import { GqlJwtGuard } from './guards/jwt-gql.guard';
import { resolvers } from './auth.resolver';

@Global()
@Module({
  imports: [
    UserSocialModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    RoleCheckService,
    LocalStrategy,
    JwtStrategy,
    GqlLocalGuard,
    GqlJwtGuard,
    ...resolvers,
  ],
  exports: [AuthService, RoleCheckService],
})
export class AuthModule {}
