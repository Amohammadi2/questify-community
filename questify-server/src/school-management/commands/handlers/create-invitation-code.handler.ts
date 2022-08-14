import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvitationCodeCommand } from '../commands';
import {
  InvitationCode,
  InvitationCodeDocument
} from "../../database/invitation-code";
import { toObjectId } from 'src/utils/to-object-id';


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
      ownerUser: toObjectId(command.userId),
      targetRole: command.targetRole,
      targetSchool: toObjectId(command.targetSchoolId),
    });
  }
}
