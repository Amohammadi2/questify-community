import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Query, InputType, Field, Args } from '@nestjs/graphql';
import { RoleGuard } from './auth.guard';
import { AuthToken, User } from './auth.objects';
import { AuthService } from './auth.service';

@InputType()
export class UserCredentialsInput {
  @Field() username: string;
  @Field() password: string;
}

@Resolver()
export class AuthResolver {
  
  constructor(
    private readonly authService: AuthService
  ) {}

  @Query(()=>String)
  @UseGuards(RoleGuard('admin'))
  async hello() {
    return 'hello';
  }

  @Mutation(()=>User)
  @UseGuards(RoleGuard('admin'))
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
}