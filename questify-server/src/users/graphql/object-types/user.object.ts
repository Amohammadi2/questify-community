import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserObject {
  @Field() username: string;
}