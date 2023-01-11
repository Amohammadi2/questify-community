import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserRoleObject {
  @Field() role: string;
  @Field() schoolName: string;
  @Field() schoolId: string;
}