import { UnauthorizedException } from "@nestjs/common";
import { Mutation, Resolver, Query, Args } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import { GetAuthTokenInput } from "./input-types/get-auth-token.input";
import { GetAuthTokenResult } from "./result-types/get-auth-token.result";


@Resolver()
export class AuthResolver {
  
  constructor(
    private readonly authService: AuthService
  ) {}

  @Query(() => String)
  hello() { return "hello world" }

  @Mutation(() => GetAuthTokenResult)
  public async getAuthToken(@Args('input') input: GetAuthTokenInput): Promise<GetAuthTokenResult> {
    const user = await this.authService.authenticateUser(input.username, input.password);
    if (!user) throw new UnauthorizedException('Username or password is incorrect');
    const result = await this.authService.generateAccessToken(user);
    return { token: result.access_token, user }
  }

}