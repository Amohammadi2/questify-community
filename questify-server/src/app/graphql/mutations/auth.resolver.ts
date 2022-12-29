import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthAppService } from "src/app/graphql/services/auth.app.service";
import { CredentialsInput } from '../models/inputs/user-credentials.input';
import { LoginResultsObject } from "../models/objects/login-results.object";

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthAppService
  ) {}

  @Mutation(()=>LoginResultsObject)
  async login(@Args('input') input: CredentialsInput) {
    const { token, user } = await this.authService.login(input);
    return {
      token, user
    };
  }

}