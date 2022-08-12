import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpWithInvitationCommand } from '../../commands';
import {
  CreateUserInput,
  UserInterface
} from "../../../user-social/graphql/typedefs/user/user.defs";
import { safeCall } from 'src/utils/safe-call';
import { registerUserErrorMap, signUpWithInvitationErrorMap } from '../../../user-social/graphql/error-map';


@Resolver()
export class SignUpWithInvitationResolver {

  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @Mutation(() => UserInterface)
  public async signUpWithInviation(
    @Args('code') code: string,
    @Args('input') input: CreateUserInput
  ) {
    return await safeCall({ ...registerUserErrorMap, ...signUpWithInvitationErrorMap }, async () => {
      const newUser = await this.commandBus.execute(
        new SignUpWithInvitationCommand(code, input)
      );
      return newUser;
    });
  }
}
