import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "src/users/graphql/object-types/user.object";

@ObjectType()
export class GetAuthTokenResult {
  @Field() token: string;
  @Field() user: UserObject
}