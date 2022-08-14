import { CreateSchoolHandler } from './handlers/create-school.handler';
import { DeleteSchoolHandler } from './handlers/delete-school.handler';
import { UpdateSchoolHandler } from './handlers/update-school.handler';
import { ChangeRoleHandler } from './handlers/change-role.handler';
import { CreateInvitationCodeHandler } from './handlers/create-invitation-code.handler';
import { AddManagerHandler } from './handlers/add-manager.handler';
import { SetSchoolActiveStatusHandler } from './handlers/set-school-active-status.handler';

export * from "./commands";

export const handlers = [
  CreateSchoolHandler,
  UpdateSchoolHandler,
  DeleteSchoolHandler,
  CreateInvitationCodeHandler,
  ChangeRoleHandler,
  AddManagerHandler,
  SetSchoolActiveStatusHandler
];
