import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./domain/auth.service";
import { AuthResolver } from "./gateway/auth.resolver";

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {};