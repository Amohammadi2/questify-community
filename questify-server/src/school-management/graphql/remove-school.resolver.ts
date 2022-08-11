import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { DeleteSchoolCommand } from '../commands/commands';


@Resolver()
export class RemoveSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => Boolean)
  public async removeSchool(
    @Args('id') id: string
  ) {
    return await this.commandBus.execute(new DeleteSchoolCommand(id));
  }
}
