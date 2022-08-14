import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserAccountCommand } from "../commands";
import * as bcrypt from "bcrypt";
import { UserAccount, UserAccountDoc } from "src/auth/database/user-account";

@CommandHandler(CreateUserAccountCommand)
export class CreateUserAccountHandler implements ICommandHandler<CreateUserAccountCommand> {
  constructor(
    @InjectModel(UserAccount.name) private readonly userAccount: Model<UserAccountDoc>
  ) {}

  async execute({ account }: CreateUserAccountCommand) {
    if (this.userAccount.exists({ username: account.username }))
      throw Error('username-taken');
    const user = await this.userAccount.create({
      ...account,
      password: bcrypt.hashSync(account.password, bcrypt.genSaltSync())
    });
    if (!user) throw Error('could-not-register');
    return user;
  }
}

