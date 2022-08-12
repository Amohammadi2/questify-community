import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserCommand } from '../commands';
import {
  UserDocument,
  User
} from "../../../user-social/database/user";
import * as bcrypt from 'bcrypt';


@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand<any>>
{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async execute(command: RegisterUserCommand<any>) {
    if (await this.userModel.exists({ username: command.userInfo.username }))
      throw Error('username-taken');
    const payload = {
      ...command.userInfo,
      password: bcrypt.hashSync(
        command.userInfo.password,
        bcrypt.genSaltSync()
      ),
    };
    const user = await this.userModel.create(payload);
    if (!user)
      throw Error('could-not-register');
    return user;
  }
}
