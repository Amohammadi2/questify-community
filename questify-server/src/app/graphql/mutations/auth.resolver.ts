import { UnauthorizedException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthAppService } from "src/app/graphql/services/auth.app.service";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { AuthTokenPayload } from "../dtos/auth-token-payload.dto";
import { UserCredentialsInput } from '../models/inputs/user-credentials.input';
import { LoginResultsObject } from "../models/objects/login-results.object";
import { UserObject } from "../models/objects/user.object";

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthAppService,
    private readonly userRepo: UserRepository
  ) {}

  @Mutation(()=>LoginResultsObject)
  async login(@Args('input') input: UserCredentialsInput) {
    const { token, user } = await this.authService.login(input);
    return {
      token, user
    };
  }

  @Mutation(()=>UserObject)
  async verify(@Args('token') token: string) {
    try {
      const { userId } = await this.authService.verify(token) as AuthTokenPayload;
      return await this.userRepo.findById(userId);
    }
    catch(e) {
      throw new UnauthorizedException(e.message);
    }
  }

}