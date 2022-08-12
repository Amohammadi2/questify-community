import { UnauthorizedException } from '@nestjs/common';
import { ChangeSchoolMemberRoleResolver } from './mutations/update-school.resolver';
import { CreateSchoolResolver } from './mutations/create-school.resolver';
import { RemoveSchoolResolver } from './mutations/remove-school.resolver';
import { UpdateSchoolResolver } from './mutations/change-member-role.resolver';

export * from "./typedefs/school.defs";

export const resolvers = [
  CreateSchoolResolver,
  UpdateSchoolResolver,
  RemoveSchoolResolver,
  ChangeSchoolMemberRoleResolver
];
