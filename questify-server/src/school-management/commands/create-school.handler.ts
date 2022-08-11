import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchoolCommand } from './commands';
import { School, SchoolDocument } from '../school-management.schemas';


@CommandHandler(CreateSchoolCommand)
export class CreateSchoolHandler
  implements ICommandHandler<CreateSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>
  ) { }

  async execute(command: CreateSchoolCommand) {
    return await this.schoolModel.create(command.school);
  }
}
