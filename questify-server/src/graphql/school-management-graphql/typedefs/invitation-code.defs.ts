import {
  Field,
  InputType
} from '@nestjs/graphql';
import { SchoolMemberRole } from 'src/school-management/database/school-member';

@InputType()
export class InvitationCodeCreateInput {
  @Field() daysValid: number;
  @Field() targetRole: SchoolMemberRole;
  @Field() targetSchool: string;
}
