import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from "../../../user-social/database/user";
import { ChangeRoleCommand } from '../commands';


@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }

  async execute({ userId, newRole }: ChangeRoleCommand): Promise<boolean> {
    const res = await this.userModel.updateOne({ id: userId }, {
      role: newRole
    });
    if (res.modifiedCount == 0)
      return false;
    return true;
  }
}
