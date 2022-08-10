import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user-social/user-social.schemas';
import {
  SetAccountActiveStatusCommand,
  SetSchoolActiveStatusCommand,
} from './admin.commands';
import { User } from 'src/user-social/user-social.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import {
  School,
  SchoolDocument,
} from 'src/school-management/school-management.schemas';

@CommandHandler(SetAccountActiveStatusCommand)
export class SetAccountActiveStatusHandler
  implements ICommandHandler<SetAccountActiveStatusCommand>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async execute({ userId, isActive }: SetAccountActiveStatusCommand) {
    const user = await this.userModel.findByIdAndUpdate(toObjectId(userId), {
      isActive,
    });
    return !!user;
  }
}

@CommandHandler(SetSchoolActiveStatusCommand)
export class SetSchoolActiveStatusHandler
  implements ICommandHandler<SetSchoolActiveStatusCommand>
{
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
  ) {}

  async execute({ schoolId, isActive }: SetSchoolActiveStatusCommand) {
    const school = await this.schoolModel.findByIdAndUpdate(
      toObjectId(schoolId),
      { isActive },
    );
    return !!school;
  }
}

export const handlers = [
  SetAccountActiveStatusHandler,
  SetSchoolActiveStatusHandler,
];
