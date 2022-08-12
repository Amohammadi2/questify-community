import {
  Field,
  InputType
} from '@nestjs/graphql';
import { UserRole } from "../../database/user";

//#endregion
//#region Invitation Code Object
@InputType()
export class InvitationCodeCreateInput {
  @Field() daysValid: number;
  @Field() targetRole: UserRole;
  @Field() targetSchool: string;
}
