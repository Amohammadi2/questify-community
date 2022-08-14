import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { CreateSchoolInput, SchoolObject } from '../typedefs/school.defs';
import { CreateSchoolCommand } from 'src/school-management/commands';
import { UserAccountDoc } from 'src/auth/database/user-account';




@Resolver()
export class CreateSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, MemberRoleGuard('isManagerOrAdmin'))
  @Mutation(() => SchoolObject)
  public async registerSchool(
    @Args('input') input: CreateSchoolInput,
    @CUser() user: UserAccountDoc
  ) {
    return await this.commandBus.execute(new CreateSchoolCommand(input));
  }
}
