import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteSchoolCommand } from '../commands';
import { School, SchoolDocument } from "../../database/school";


@CommandHandler(DeleteSchoolCommand)
export class DeleteSchoolHandler
  implements ICommandHandler<DeleteSchoolCommand>
{
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>
  ) { }

  async execute(command: DeleteSchoolCommand): Promise<boolean> {
    if (await this.schoolModel.findOneAndDelete({ id: command.id }))
      return true;
    else
      return false;
  }
}
