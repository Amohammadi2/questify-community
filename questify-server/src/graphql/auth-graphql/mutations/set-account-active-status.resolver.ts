import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { SetAccountActiveStatusCommand } from '../../../auth/commands';


@Resolver()
export class SetAccountActiveStatusResolver {
  constructor(private readonly commandBus: CommandBus) { }

  @UseGuards(GqlJwtGuard, MemberRoleGuard('isAdmin'))
  @Mutation(() => Boolean)
  public async setAccountActiveStatus(
    @Args('userId') userId: string,
    @Args('isActive') isActive: boolean
  ) {
    return await this.commandBus.execute(
      new SetAccountActiveStatusCommand(userId, isActive)
    );
  }
}
