import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { SchoolObject } from 'src/school-management/school-management.schemas';
import {
  InvitationCodeBase,
  ManagerBase,
  UserBase,
  UserRole,
} from './user-social.schemas';

//#region User Object
@ObjectType()
export class UserObject implements Omit<UserBase, 'password'> {
  @Field() username: string;
  @Field() role: UserRole;
  @Field() id?: string;
}

@InputType()
export class UserCreateInput extends OmitType(
  UserObject,
  ['id', 'role'],
  InputType,
) {
  @Field() password: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput, InputType) {}

@InputType()
export class InvitationCodeInput
  implements Omit<InvitationCodeBase, 'ownerUser'>
{
  @Field() daysValid: number;
  @Field() targetRole: UserRole;
  @Field() targetSchool: string;
}
//#endregion

//#region Manager Object
@ObjectType()
export class ManagerObject extends UserObject implements ManagerBase {
  @Field(() => [SchoolObject]) schools: SchoolObject[];
}

@InputType()
export class ManagerCreateInput extends OmitType(
  ManagerObject,
  ['id', 'role', 'schools'],
  InputType,
) {
  @Field(() => [String]) schools: string[]
  @Field() password: string;
}

@InputType()
export class ManagerUpdateInput extends PartialType(ManagerCreateInput) {}
//#endregion
