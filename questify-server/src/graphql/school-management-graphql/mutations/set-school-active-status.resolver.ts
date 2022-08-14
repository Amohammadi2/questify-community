import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IsAdminGuard } from 'src/auth/guards';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { SetSchoolActiveStatusCommand } from '../../../school-management/commands';


@Resolver()
export class SetSchoolActiveStatusResolver {
  constructor(private readonly commandBus: CommandBus) { }

  @UseGuards(GqlJwtGuard, IsAdminGuard)
  @Mutation(() => Boolean)
  public async setSchoolActiveStatus(
    @Args('schoolId') schoolId: string,
    @Args('isActive') isActive: boolean
  ) {
    return await this.commandBus.execute(
      new SetSchoolActiveStatusCommand(schoolId, isActive)
    );
  }
}
