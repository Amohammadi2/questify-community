import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { SetSchoolActiveStatusCommand } from '../commands';
import { InjectModel } from '@nestjs/mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import {
  School,
  SchoolDocument
} from "src/school-management/database/school";


@CommandHandler(SetSchoolActiveStatusCommand)
export class SetSchoolActiveStatusHandler
  implements ICommandHandler<SetSchoolActiveStatusCommand>
{
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>
  ) { }

  async execute({ schoolId, isActive }: SetSchoolActiveStatusCommand) {
    const school = await this.schoolModel.findByIdAndUpdate(
      toObjectId(schoolId),
      { isActive }
    );
    return !!school;
  }
}
