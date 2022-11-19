import { Resolver, Mutation, Query, Directive, InputType, Field, Args } from '@nestjs/graphql';
import { AuthToken, User } from './auth.objects';
import { AuthService } from './auth.service';

@InputType()
class UserCredentialsInput {
  @Field() username: string;
  @Field() password: string;
}

@Resolver()
export class AuthResolver {
  
  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(()=>AuthToken)
  async signup(@Args('input') input: UserCredentialsInput) {
    const user = await this.authService.signup(input);
    return {
      id: user.id,
      username: user.username
    };
  }

  @Mutation(()=>AuthToken)
  async getAuthToken(@Args('input') input: UserCredentialsInput) {
    const token = await this.authService.getAuthToken(input);
    return {
      accessToken: token
    };
  }

  @Mutation(()=>Boolean)
  async verifyAuthToken(@Args('token') token: string) {
    return await this.authService.verifyAuthToken(token);
  }

  @Mutation(()=>User)
  async getAshkan() {
    return await this.authService.getAshkan()
  }

}