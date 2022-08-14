import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { UserAccountDoc, UserAccount } from "src/auth/database/user-account";
import { SetAccountActiveStatusCommand } from '../commands';
import { InjectModel } from '@nestjs/mongoose';
import { toObjectId } from 'src/utils/to-object-id';


@CommandHandler(SetAccountActiveStatusCommand)
export class SetAccountActiveStatusHandler
  implements ICommandHandler<SetAccountActiveStatusCommand>
{
  constructor(
    @InjectModel(UserAccount.name) private readonly userModel: Model<UserAccountDoc>
  ) { }

  async execute({ userId, isActive }: SetAccountActiveStatusCommand) {
    const user = await this.userModel.findByIdAndUpdate(toObjectId(userId), {
      isActive,
    });
    return !!user;
  }
}
