import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "src/user-social/graphql/object-types/user.object";

@ObjectType()
export class GetAuthTokenResult {
  @Field() token: string;
  @Field() user: UserObject
}