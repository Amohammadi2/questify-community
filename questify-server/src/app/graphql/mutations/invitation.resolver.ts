import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { InvitationService } from "src/domain/services";
import { GenInvitationCodeInput } from "../models/inputs/generate-invitation-code.input";


@Resolver()
export class InvitationResolver {
  
  constructor(
    private readonly invitationService: InvitationService
  ) {}

  @Mutation(()=>String)
  async genInvitationCode(@Args('input') input: GenInvitationCodeInput) {
    const code = await this.invitationService.createInvitation({
      ...input,
      expirationDate: new Date(input.expirationDate)
    });
    return code;
  }
  
}