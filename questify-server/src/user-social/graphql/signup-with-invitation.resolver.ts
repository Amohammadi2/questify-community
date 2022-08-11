import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpWithInvitationCommand } from '../commands/commands';
import {
  UserCreateInput,
  UserInterface
} from '../user-social.objects';
import { safeCall } from 'src/utils/safe-call';
import { registerUserErrorMap, signUpWithInvitationErrorMap } from './error-map';


@Resolver()
export class SignUpWithInvitationResolver {

  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @Mutation(() => UserInterface)
  public async signUpWithInviation(
    @Args('code') code: string,
    @Args('input') input: UserCreateInput
  ) {
    return await safeCall({ ...registerUserErrorMap, ...signUpWithInvitationErrorMap }, async () => {
      const newUser = await this.commandBus.execute(
        new SignUpWithInvitationCommand(code, input)
      );
      return newUser;
    });
  }
}
