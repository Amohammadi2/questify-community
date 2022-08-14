import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleCheckService } from "../school-management/role-check.service";
import { UserSocialModule } from '../user-social/user-social.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlLocalGuard } from './guards/local-gql.guard';
import { GqlJwtGuard } from './guards/jwt-gql.guard';
import { CqrsModule } from '@nestjs/cqrs';
import { handlers } from './commands';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from './database';
import { SchoolManagementModule } from 'src/school-management/school-management.module';

const mongooseModule = MongooseModule.forFeature(schemas);

@Global()
@Module({
  imports: [
    CqrsModule,
    mongooseModule,
    UserSocialModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    SchoolManagementModule
  ],
  providers: [
    AuthService,
    RoleCheckService,
    LocalStrategy,
    JwtStrategy,
    GqlLocalGuard,
    GqlJwtGuard,
    ...handlers
  ],
  exports: [AuthService, RoleCheckService, mongooseModule],
})
export class AuthModule {}
