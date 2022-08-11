import { ChangeRoleHandler } from './change-role.handler';
import { CreateSchoolHandler } from './create-school.handler';
import { DeleteSchoolHandler } from './delete-school.handler';
import { UpdateSchoolHandler } from './update-school.handler';

export const handlers = [
  CreateSchoolHandler,
  UpdateSchoolHandler,
  DeleteSchoolHandler,
  ChangeRoleHandler
];
