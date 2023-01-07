import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/infrastructure/jwt/jwt.constants";
import { AuthResolver } from "./mutations/auth.resolver";
import { UserManagementResolver } from './mutations/user-management.resolver';
import { RootResolver } from "./queries/root.resolver";
import { AuthAppService } from "./services/auth.app.service";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'ES256'
      },
      verifyOptions: {
        ignoreExpiration: false,
        algorithms: ['ES256']
      }
    }),
  ],
  providers: [AuthAppService, AuthResolver, RootResolver, UserManagementResolver]
})
export class AppGraphqlModule {}