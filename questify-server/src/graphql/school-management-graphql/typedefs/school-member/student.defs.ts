import { Field, ObjectType } from "@nestjs/graphql";
import { UserAccountObject } from "../../../auth-graphql/typedefs/user-account.defs";
import { SchoolObject } from "../school.defs";
import { SchoolMemberInterface } from "./school-member.defs";

@ObjectType({ implements: SchoolMemberInterface })
export class StudentObject implements SchoolMemberInterface {
  @Field(()=>UserAccountObject) account: UserAccountObject;
  @Field() role: string;
  @Field(()=>SchoolObject) school: SchoolObject;
}