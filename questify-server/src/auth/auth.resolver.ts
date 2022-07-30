import { UnauthorizedException } from "@nestjs/common";
import { Mutation, Resolver, Query, Args, InputType, Field, ObjectType } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument, UserObject } from "src/user-social/user-social.schemas";
import { AuthService } from "./auth.service";


//#region Get Auth Token
@InputType()
class GetAuthTokenInput {
  @Field() username: string;
  @Field() password: string;
}

@ObjectType()
class GetAuthTokenResult {
  @Field() token: string;
  @Field(()=>UserObject) user: UserObject;
}

@Resolver()
export class GetAuthTokenResolver {
  
  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation(() => GetAuthTokenResult)
  public async getAuthToken(@Args('input') input: GetAuthTokenInput): Promise<GetAuthTokenResult> {
    const user = await this.authService.authenticateUser(input.username, input.password);
    if (!user) throw new UnauthorizedException('Username or password is incorrect');
    const result = await this.authService.generateAccessToken(user);
    return { token: result.access_token, user }
  }

}
//#endregion

//#region Verify Token

@InputType()
class VerifyTokenInput {
  @Field() token: string;
}

@Resolver()
export class VerifyTokenResolver {

  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  @Mutation(() => UserObject, { nullable: true })
  public async verifyToken(@Args('input') input: VerifyTokenInput) {
    const { sub } = await this.authService.validateToken(input.token);
    if (!sub) return null;
    return await this.userModel.findOne({ id: sub });
  }
}
//#endregion

export const resolvers = [
  GetAuthTokenResolver,
  VerifyTokenResolver
];