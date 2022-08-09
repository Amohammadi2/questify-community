import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { UserDocument } from "src/user-social/user-social.schemas";
import { SetAccountActiveStatusCommand } from "./admin.commands";
import { User } from "src/user-social/user-social.schemas";
import { InjectModel } from "@nestjs/mongoose";
import { toObjectId } from "src/utils/to-object-id";

@CommandHandler(SetAccountActiveStatusCommand)
export class SetAccountActiveStatusHandler implements ICommandHandler<SetAccountActiveStatusCommand> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async execute({ userId, isActive }: SetAccountActiveStatusCommand) {
    const user = await this.userModel.findByIdAndUpdate(toObjectId(userId), { isActive });
    return !!user;
  }
}

export const handlers = [SetAccountActiveStatusHandler];