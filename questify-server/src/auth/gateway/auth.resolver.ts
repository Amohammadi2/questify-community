import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { getPasswordHash } from "src/utils/get-password-hash";
import { AuthService } from "../domain/auth.service";
import { ObtainAuthTokenInput } from "./dto/obtain-auth-token.input";
import { ObtainAuthTokenOutput } from "./dto/obtain-auth-token.output";
import { VerifyTokenOutput } from "./dto/verify-token.output";

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(() => VerifyTokenOutput)
  public async verifyToken(@Args("token") token: string) {
    const result = await this.authService.verifyToken(token);
    if (result == "invalid" || result == "not-found") {
      throw new UnauthorizedException('Token is invalid or expired');
    }
    return { user: result };
  }

  @Mutation(() => ObtainAuthTokenOutput)
  async obtainAuthToken(@Args("input") obtainAuthTokenInput: ObtainAuthTokenInput) {
    const result = await this.authService.obtainAuthToken({
      ...obtainAuthTokenInput,
      password: getPasswordHash(obtainAuthTokenInput.password)
    });

    if (result === "invalid-credentials") {
      throw new UnauthorizedException('Please enter valid credentials');
    }

    return result;
  }
}