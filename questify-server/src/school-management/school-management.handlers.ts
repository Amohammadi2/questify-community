import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateSchoolCommand,
  DeleteSchoolCommand,
  UpdateSchoolCommand,
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

  async execute(command: DeleteSchoolCommand): Promise<'ok' | 'not-found'> {
    if (await this.schoolModel.findOneAndDelete({ id: command.id }))
      return 'ok';
    else return 'not-found';
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
    const res = await this.schoolModel.findOneAndUpdate(
      { id: command.id },
      command.school,
    );
    if (!res) return 'not-found';
    return;
  }
}

export const handlers = [CreateSchoolHandler];
