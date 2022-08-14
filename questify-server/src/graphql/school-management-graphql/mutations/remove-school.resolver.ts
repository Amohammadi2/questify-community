import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { DeleteSchoolCommand } from 'src/school-management/commands';
import { MemberRoleGuard } from 'src/school-management/guards';


@Resolver()
export class RemoveSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, MemberRoleGuard('isManagerOrAdmin'))
  @Mutation(() => Boolean)
  public async removeSchool(
    @Args('id') id: string
  ) {
    return await this.commandBus.execute(new DeleteSchoolCommand(id));
  }
}
