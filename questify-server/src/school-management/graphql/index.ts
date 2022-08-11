import { UnauthorizedException } from '@nestjs/common';
import { ChangeSchoolMemberRoleResolver } from './change-member-role.resolver';
import { CreateSchoolResolver } from './create-school.resolver';
import { RemoveSchoolResolver } from './remove-school.resolver';
import { UpdateSchoolResolver } from './update-school.resolver';


export const resolvers = [
  CreateSchoolResolver,
  UpdateSchoolResolver,
  RemoveSchoolResolver,
  ChangeSchoolMemberRoleResolver
];
