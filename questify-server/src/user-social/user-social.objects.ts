import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { InvitationCodeBase, UserBase, UserRole } from './user-social.schemas';


@ObjectType()
export class UserObject implements Omit<UserBase, 'password'> {
  @Field() username: string;
  @Field() role: UserRole;
  @Field() id?: string;
}

@InputType()
export class UserCreateInput extends OmitType(UserObject, ['id', 'role'], InputType) {
  @Field() password: string;
}

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput, InputType) {
}

@InputType()
export class InvitationCodeInput implements Omit<InvitationCodeBase, "ownerUser"> {
  @Field() daysValid: number;
  @Field() targetRole: UserRole;
  @Field() targetSchool: string;
}
