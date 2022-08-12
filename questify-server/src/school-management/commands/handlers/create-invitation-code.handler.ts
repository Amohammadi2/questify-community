import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvitationCodeCommand } from '../commands';
import {
  InvitationCode,
  InvitationCodeDocument
} from "../../../user-social/database/invitation-code";

/**
 * This command handler is going to be moved to the school management module
 * in the next phase. The reason is that users will be able to sign up
 * without an invitation. The invitation process is only required when 
 * joining schools.
 * 
 * Todo: move this command handler to the school management module
 */

@CommandHandler(CreateInvitationCodeCommand)
export class CreateInvitationCodeHandler
  implements ICommandHandler<CreateInvitationCodeCommand>
{
  constructor(
    @InjectModel(InvitationCode.name)
    private readonly invitationCodeModel: Model<InvitationCodeDocument>
  ) { }

  async execute(command: CreateInvitationCodeCommand) {
    return await this.invitationCodeModel.create({
      daysValid: command.daysValid,
      ownerUser: command.user.id,
      targetRole: command.targetRole,
      targetSchool: command.targetSchool,
    });
  }
}
