import { CommandBus } from "@nestjs/cqrs";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateUserAccountCommand } from "src/auth/commands";
import { safeCall } from "src/utils/safe-call";
import {  } from "../../../auth/guards";
import { createUserAccountErrorMap } from "../error-map";
import { CreateUserAccountInput, UserAccountObject } from "../typedefs/user-account.defs";

@Resolver()
export class CreateUserAccountResolver {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @Mutation(()=>UserAccountObject)
  public async createAccount(
    @Args('input') input: CreateUserAccountInput
  ) {
    return await safeCall(createUserAccountErrorMap, async () => 
      await this.commandBus.execute(
        new CreateUserAccountCommand(input)
      )
    );
  }

}