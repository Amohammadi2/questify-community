import { Field, InterfaceType } from "@nestjs/graphql";
import { UserAccountObject } from "../../../auth-graphql/typedefs/user-account.defs";

@InterfaceType()
export class SchoolMemberInterface {
  @Field(()=>UserAccountObject) account: UserAccountObject;
  @Field() role: string;
}