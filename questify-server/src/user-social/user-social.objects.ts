import {
  Field,
  InputType,
  InterfaceType,
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
@InterfaceType()
export class UserInterface implements Omit<UserBase, 'password'> {
  @Field() username: string;
  @Field() role: UserRole;
  @Field() id?: string;
}

@InputType()
export class UserCreateInput extends OmitType(
  UserInterface,
  ['id', 'role'],
  InputType,
) {
  @Field() password: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput) {}
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
  InputType,
) {
  @Field(() => [String]) schools: string[]
  @Field() password: string;
}

@InputType()
export class ManagerUpdateInput extends PartialType(ManagerCreateInput) {}
//#endregion

//#region Invitation Code Object
@InputType()
export class InvitationCodeInput
  implements Omit<InvitationCodeBase, 'ownerUser'>
{
  @Field() daysValid: number;
  @Field() targetRole: UserRole;
  @Field() targetSchool: string;
}
//#endregion