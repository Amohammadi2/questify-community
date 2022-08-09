import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { RegisterUserCommand } from 'src/user-social/user-social.commands';
import { ManagerCreateInput, ManagerObject } from 'src/user-social/user-social.objects';
import { ManagerPayload } from 'src/user-social/user-social.schemas';
import { toObjectId } from 'src/utils/to-object-id';

@Resolver()
export class AdminResolver {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @UseGuards(GqlJwtGuard, RoleGuard('isAdmin'))
  @Mutation(() => ManagerObject)
  public async registerManager(
    @Args('input') input: ManagerCreateInput
  ) {
    return await this.commandBus.execute(new RegisterUserCommand<ManagerPayload>({
      ...input,
      schools: input.schools.map(s => toObjectId(s)),
      role: 'MANAGER'
    }));
  }

}
