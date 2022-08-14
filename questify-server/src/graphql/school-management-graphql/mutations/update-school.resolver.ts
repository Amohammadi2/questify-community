import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { UpdateSchoolCommand } from 'src/school-management/commands';
import {
  SchoolObject,
  UpdateSchoolInput,
} from 'src/graphql/school-management-graphql/typedefs/school.defs';
import { UserAccountDoc } from 'src/auth/database/user-account';

@Resolver()
export class ChangeSchoolMemberRoleResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => SchoolObject)
  @UseGuards(GqlJwtGuard, MemberRoleGuard('isManagerOrAdmin'))
  public async updateSchool(
    @Args('id') id: string,
    @Args('input') input: UpdateSchoolInput,
    @CUser() user: UserAccountDoc,
  ) : Promise<any> {
    return await this.commandBus.execute(new UpdateSchoolCommand(id, input as unknown as UpdateSchoolInput));
  }
}
