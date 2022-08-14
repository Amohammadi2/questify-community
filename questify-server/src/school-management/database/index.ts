import { InvitationCode, invitationCodeSchema } from './invitation-code';
import { School, schoolSchema } from './school';
import { SchoolMember, schoolMemberSchema } from './school-member';

export const models = [
  { name: School.name, schema: schoolSchema },
  { name: SchoolMember.name, schema: schoolMemberSchema},
  { name: InvitationCode.name, schema: invitationCodeSchema }
];
