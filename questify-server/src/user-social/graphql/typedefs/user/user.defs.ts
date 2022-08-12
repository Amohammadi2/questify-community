import {
  Field,
  InputType,
  InterfaceType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { UserRole } from '../../../database/user';

//#region User Object

@InterfaceType()
export class UserInterface {
  @Field() username: string;
  @Field() role: UserRole;
  @Field() id?: string;
}

@InputType()
export class CreateUserInput {
  username: string;
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password']),
) {}
