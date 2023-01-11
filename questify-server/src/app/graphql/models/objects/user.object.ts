import { Field, ObjectType } from "@nestjs/graphql";
import { UserRoleObject } from "./user-role.object";

@ObjectType()
export class UserObject {
  @Field() id: string;
  @Field() username: string;
  @Field(()=>[UserRoleObject]) schoolRoles: UserRoleObject[];
}