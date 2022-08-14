import { UnauthorizedException } from '@nestjs/common';
import {
  Mutation,
  Resolver,
  Args,
  InputType,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../../auth/auth.service';
import { UserAccountObject, CreateUserAccountInput } from "./typedefs/user-account.defs";
import { UserAccount, UserAccountDoc } from "../../auth/database/user-account";

@InputType()
class VerifyTokenInput {
  @Field() token: string;
}

@InputType()
class GetAuthTokenInput {
  @Field() username: string;
  @Field() password: string;
}

@ObjectType()
class GetAuthTokenResult {
  @Field() token: string;
  @Field(() => UserAccountObject) user: UserAccountObject;
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(UserAccount.name) private userModel: Model<UserAccountDoc>,
  ) {}

  @Mutation(() => GetAuthTokenResult)
  public async getAuthToken(
    @Args('input') input: GetAuthTokenInput,
  ): Promise<GetAuthTokenResult> {
    const user = await this.authService.authenticateUser(
      input.username,
      input.password,
    );
    if (!user)
      throw new UnauthorizedException('Username or password is incorrect');
    const result = await this.authService.generateAccessToken(user);
    return { token: result.access_token, user };
  }

  @Mutation(() => UserAccountObject, { nullable: true })
  public async verifyToken(@Args('input') input: VerifyTokenInput) {
    const { sub } = await this.authService.validateToken(input.token);
    if (!sub) return null;
    return await this.userModel.findOne({ id: sub });
  }
}

export const resolvers = [AuthResolver];
