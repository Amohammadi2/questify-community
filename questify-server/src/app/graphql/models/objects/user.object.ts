import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserObject {
  @Field() id: string;
  @Field() username: string;
}