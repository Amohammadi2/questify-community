import { CreateSchoolHandler } from './handlers/create-school.handler';
import { DeleteSchoolHandler } from './handlers/delete-school.handler';
import { UpdateSchoolHandler } from './handlers/update-school.handler';
import { ChangeRoleHandler } from './handlers/change-role.handler';
import { CreateInvitationCodeHandler } from './handlers/create-invitation-code.handler';
import { SignUpWithInvitationHandler } from './handlers/signup-with-invitation.handler';

export * from "./commands";

export const handlers = [
  CreateSchoolHandler,
  UpdateSchoolHandler,
  DeleteSchoolHandler,
  CreateInvitationCodeHandler,
  SignUpWithInvitationHandler,
  ChangeRoleHandler,
];
