import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/user/gateway/entities/user.entity";

@ObjectType()
export class ObtainAuthTokenOutput {
  @Field() token: string;
  @Field(() => User) user: User;
}