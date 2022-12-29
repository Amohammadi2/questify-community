import { Field, ObjectType } from "@nestjs/graphql";
import { UserObject } from "./user.object";

@ObjectType()
export class LoginResultsObject {
  @Field() token: string;
  @Field() user: UserObject
}
