import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { ChangeRoleCommand } from '../../commands';


@Resolver()
export class UpdateSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, RoleGuard('isManager'))
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
