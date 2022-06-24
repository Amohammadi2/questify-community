import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { getPasswordHash } from "src/utils/get-password-hash";
import { AuthService } from "../domain/auth.service";
import { ObtainAuthTokenInput } from "./dto/obtain-auth-token.input";
import { ObtainAuthTokenOutput } from "./dto/obtain-auth-token.output";

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(() => Boolean)
  public async verifyToken(@Args("token") token: string): Promise<boolean> {
    return (await this.authService.verifyToken(token)) === "ok";
  }

  @Mutation(() => ObtainAuthTokenOutput)
  async obtainAuthToken(@Args("input") obtainAuthTokenInput: ObtainAuthTokenInput) {
    const token = await this.authService.obtainAuthToken({
      ...obtainAuthTokenInput,
      password: getPasswordHash(obtainAuthTokenInput.password)
    });

    if (token === "invalid-credentials") {
      throw new UnauthorizedException('Please enter valid credentials');
    }

    return new String(token.token);
  }
}