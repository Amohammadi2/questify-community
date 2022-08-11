import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSchoolCommand } from './commands';
import { School, SchoolDocument } from '../school-management.schemas';


@CommandHandler(UpdateSchoolCommand)
export class UpdateSchoolHandler
  implements ICommandHandler<UpdateSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>
  ) { }

  async execute(
    command: UpdateSchoolCommand
  ): Promise<SchoolDocument | 'not-found'> {
    const res = await this.schoolModel.updateOne(
      { id: command.id },
      command.school
    );
    if (!res.modifiedCount)
      return 'not-found';
    return await this.schoolModel.findOne({ id: command.id });
  }
}
