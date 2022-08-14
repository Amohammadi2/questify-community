import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { ChangeRoleCommand } from 'src/school-management/commands';


@Resolver()
export class UpdateSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, MemberRoleGuard('isManager'))
  @Mutation(() => Boolean)
  public async changeSchoolMemberRole(
    @Args('userId') userId: string,
    @Args('newRole') newRole: 'STUDENT' | 'TEACHER'
  ) {
    if (!['STUDENT','TEACHER'].includes(newRole))
      throw new UnauthorizedException('Invalid role: '+newRole);
    return await this.commandBus.execute(new ChangeRoleCommand(userId, newRole));
  }
}
