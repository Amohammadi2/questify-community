import {
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateInvitationCodeCommand } from '../commands/commands';
import {
  InvitationCodeDocument,
  ManagerDocument
} from '../user-social.schemas';
import { InvitationCodeInput } from '../user-social.objects';
import { CUser } from 'src/auth/user.decorator';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';


@Resolver()
export class CreateInvitationCodeResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, RoleGuard('isManager'))
  @Mutation(() => String)
  public async createInvitationCode(
    @Args('input') input: InvitationCodeInput,
    @CUser() manager: ManagerDocument
  ) {

    // Todo: Move the validation logic inside the command
    const allowedRoles = ['TEACHER', 'STUDENT'];
    // validate input here
    if (!allowedRoles.includes(input.targetRole))
      throw new UnauthorizedException(
        'You can only invite students or teachers'
      );

    if (!(<string[]>(<unknown>manager.schools)).includes(input.targetSchool))
      throw new UnauthorizedException(
        'You can only invite students to schools that belong to you'
      );

    const code: InvitationCodeDocument = await this.commandBus.execute(
      new CreateInvitationCodeCommand(
        manager,
        input.targetRole,
        input.daysValid,
        input.targetSchool
      )
    );

    return code.id;
  }
}
