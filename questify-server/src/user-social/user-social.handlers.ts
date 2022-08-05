import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import { CreateInvitationCodeCommand, RegisterUserCommand, ValidateInvitationCodeCommand } from './user-social.commands';
import { InvitationCode, InvitationCodeDocument, UserDocument, User } from './user-social.schemas';
import * as bcrypt from "bcrypt";

@CommandHandler(CreateInvitationCodeCommand)
export class CreateInvitationCodeHandler
  implements ICommandHandler<CreateInvitationCodeCommand>
{
  constructor(
    @InjectModel(InvitationCode.name)
    private readonly invitationCodeModel: Model<InvitationCodeDocument>,
  ) {}

  async execute(command: CreateInvitationCodeCommand) {
    return await this.invitationCodeModel.create({
      daysValid: command.daysValid,
      ownerUser: command.user.id,
      targetRole: command.targetRole,
      targetSchool: command.targetSchool
    });
  }
}


@CommandHandler(ValidateInvitationCodeCommand)
export class ValidateInvitationCodeHandler implements ICommandHandler<ValidateInvitationCodeCommand> {

  constructor(
    @InjectModel(InvitationCode.name)
    private readonly invitationCodeModel: Model<InvitationCodeDocument>,
  ) {}

  async execute(command: ValidateInvitationCodeCommand) {
    try {
      const codeObj = await this.invitationCodeModel.findById(toObjectId(command.codeId));
      if (!codeObj)
        return 'not-found';
      if ((new Date().getDate()) - ((<any>codeObj).createdAt.getDate()) > (codeObj.daysValid * 24 * 60 * 60 * 1000))
        return 'expired';
      return codeObj;
    }
    catch(e) { return 'not-found' }
  }

}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand<any>> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async execute(command: RegisterUserCommand<any>) {
    const userInfo = {
      ...command.userInfo,
      password: bcrypt.hashSync(command.userInfo.password, bcrypt.genSaltSync())
    }
    return await this.userModel.create(userInfo);
  }
}

export const handlers = [
  CreateInvitationCodeHandler,
  ValidateInvitationCodeHandler,
  RegisterUserHandler
]