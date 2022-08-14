import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolMember, SchoolMemberDoc } from 'src/school-management/database/school-member';
import { toObjectId } from 'src/utils/to-object-id';
import { ChangeRoleCommand } from '../commands';


@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    @InjectModel(SchoolMember.name) private readonly schoolMember: Model<SchoolMemberDoc>
  ) { }

  async execute({ userAccountID, newRole }: ChangeRoleCommand): Promise<boolean> {
    const res = await this.schoolMember.updateOne({ account: toObjectId(userAccountID) }, {
      role: newRole
    });
    if (res.modifiedCount == 0)
      return false;
    return true;
  }
}
