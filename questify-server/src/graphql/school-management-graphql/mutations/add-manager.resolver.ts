import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { ManagerObject } from '../typedefs/school-member';
import { safeCall } from 'src/utils/safe-call';
import { addManagerErrorMap } from '../error-map';
import { AddManagerCommand } from 'src/school-management/commands';
import { IsAdminGuard } from 'src/auth/guards';

@Resolver()
export class AddManagerResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(GqlJwtGuard, IsAdminGuard)
  @Mutation(() => ManagerObject)
  public async addManager(
    @Args('schoolId') schoolId: string,
    @Args('userAccountId') userAccountId: string,
  ) {
    return await safeCall(
      addManagerErrorMap,
      async () =>
        await this.commandBus.execute(
          new AddManagerCommand(schoolId, userAccountId),
        ),
    );
  }
}
