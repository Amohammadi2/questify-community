import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { RegisterUserCommand } from 'src/user-social/user-social.commands';
import { registerUserErrorMap } from 'src/user-social/user-social.gateway-errors';
import {
  ManagerCreateInput,
  ManagerObject,
} from 'src/user-social/user-social.objects';
import { ManagerPayload } from 'src/user-social/user-social.schemas';
import { safeCall } from 'src/utils/safe-call';
import { toObjectId } from 'src/utils/to-object-id';
import {
  SetAccountActiveStatusCommand,
  SetSchoolActiveStatusCommand,
} from './admin.commands';

@Resolver()
export class AdminResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(GqlJwtGuard, RoleGuard('isAdmin'))
  @Mutation(() => ManagerObject)
  public async registerManager(@Args('input') input: ManagerCreateInput) {
    return safeCall(
      registerUserErrorMap,
      async () =>
        await this.commandBus.execute(
          new RegisterUserCommand<ManagerPayload>({
            ...input,
            schools: input.schools.map((s) => toObjectId(s)),
            role: 'MANAGER',
          }),
        ),
    );
  }

  @UseGuards(GqlJwtGuard, RoleGuard('isAdmin'))
  @Mutation(() => Boolean)
  public async setAccountActiveStatus(
    @Args('userId') userId: string,
    @Args('isActive') isActive: boolean,
  ) {
    return await this.commandBus.execute(
      new SetAccountActiveStatusCommand(userId, isActive),
    );
  }

  @UseGuards(GqlJwtGuard, RoleGuard('isAdmin'))
  @Mutation(() => Boolean)
  public async setSchoolActiveStatsus(
    @Args('schoolId') schoolId: string,
    @Args('isActive') isActive: boolean,
  ) {
    return await this.commandBus.execute(
      new SetSchoolActiveStatusCommand(schoolId, isActive),
    );
  }

  
}
