import {
  Field,
  InputType,

  ObjectType,
  OmitType,
  PartialType
} from '@nestjs/graphql';
import { SchoolObject } from "src/school-management/graphql/typedefs/school.defs";
import { ManagerBase } from "../../../database/user/discriminators/manager";
import { UserInterface } from "./user.defs";

//#endregion
//#region Manager Object
@ObjectType({ implements: UserInterface })
export class ManagerObject extends UserInterface implements ManagerBase {
  @Field(() => [SchoolObject]) schools: SchoolObject[];
}

@InputType()
export class ManagerCreateInput extends OmitType(
  ManagerObject,
  ['id', 'role', 'schools'],
  InputType
) {
  @Field(() => [String]) schools: string[];
  @Field() password: string;
}

@InputType()
export class ManagerUpdateInput extends PartialType(ManagerCreateInput) {
}
