import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user-social/user-social.schemas';
import {
  CreateSchoolCommand,
  DeleteSchoolCommand,
  UpdateSchoolCommand,
  ChangeRoleCommand,
} from './school-management.commands';
import { School, SchoolDocument } from './school-management.schemas';

@CommandHandler(CreateSchoolCommand)
export class CreateSchoolHandler
  implements ICommandHandler<CreateSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}

  async execute(command: CreateSchoolCommand) {
    return await this.schoolModel.create(command.school);
  }
}

@CommandHandler(DeleteSchoolCommand)
export class DeleteSchoolHandler
  implements ICommandHandler<DeleteSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}

  async execute(command: DeleteSchoolCommand): Promise<boolean> {
    if (await this.schoolModel.findOneAndDelete({ id: command.id }))
      return true;
    else return false;
  }
}

@CommandHandler(UpdateSchoolCommand)
export class UpdateSchoolHandler
  implements ICommandHandler<UpdateSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
  ) {}

  async execute(
    command: UpdateSchoolCommand,
  ): Promise<SchoolDocument | 'not-found'> {
    const res = await this.schoolModel.updateOne(
      { id: command.id },
      command.school,
    );
    if (!res.modifiedCount) return 'not-found';
    return await this.schoolModel.findOne({ id: command.id });
  }
}

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async execute({ userId, newRole }: ChangeRoleCommand): Promise<boolean> {
    const res = await this.userModel.updateOne({ id: userId }, {
      role: newRole
    });
    if (res.modifiedCount == 0) return false;
    return true;
  }
}


export const handlers = [
  CreateSchoolHandler,
  UpdateSchoolHandler,
  DeleteSchoolHandler,
  ChangeRoleHandler
];
