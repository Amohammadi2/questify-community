import { ChangeSchoolMemberRoleResolver } from './mutations/update-school.resolver';
import { CreateSchoolResolver } from './mutations/create-school.resolver';
import { RemoveSchoolResolver } from './mutations/remove-school.resolver';
import { UpdateSchoolResolver } from './mutations/change-member-role.resolver';
import { SetSchoolActiveStatusResolver } from './mutations/set-school-active-status.resolver';
import { CreateInvitationCodeResolver } from './mutations/create-invitation.resolver';

export * from "./typedefs/school.defs";
export * from "./typedefs/school-member";

export const schoolManagementResolvers = [
  CreateSchoolResolver,
  UpdateSchoolResolver,
  RemoveSchoolResolver,
  ChangeSchoolMemberRoleResolver,
  SetSchoolActiveStatusResolver,
  ChangeSchoolMemberRoleResolver,
  CreateInvitationCodeResolver
];
