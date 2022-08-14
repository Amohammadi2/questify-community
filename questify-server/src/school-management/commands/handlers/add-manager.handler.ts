import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { School, SchoolDocument } from "src/school-management/database/school";
import { SchoolMember, SchoolMemberDoc } from "src/school-management/database/school-member";
import { UserAccount, UserAccountDoc } from "src/auth/database/user-account";
import { AddManagerCommand } from "../commands";
import { toObjectId } from "src/utils/to-object-id";


@CommandHandler(AddManagerCommand)
export class AddManagerHandler implements ICommandHandler<AddManagerCommand> {
  constructor(
    @InjectModel(SchoolMember.name) private readonly schoolMember: Model<SchoolMemberDoc>,
    @InjectModel(School.name) private readonly school: Model<SchoolDocument>,
    @InjectModel(UserAccount.name) private readonly userAccount: Model<UserAccountDoc>
  ) {}

  private async verifyUserId(acccountId: string) {
    const result = await this.userAccount.exists({ id: toObjectId(acccountId) });
    if (!result)
      throw Error('invalid-account-id');
  }

  private async verifySchoolId(schoolId: string) {
    const result = await this.school.exists({ id: toObjectId(schoolId) });
    if (!result)
      throw Error('invalid-school-id');
  }

  private async getMemberIfExists(accountId: string) {
    const member = await this.schoolMember.findOne({ account: toObjectId(accountId) });
    return member;
  }

  async execute({userAccountId, schoolId }: AddManagerCommand) {
    await this.verifyUserId(userAccountId);
    await this.verifySchoolId(schoolId);

    const member = await this.getMemberIfExists(userAccountId);
    if (member) {
      // we need to cast it to any becuase the property, school only exists
      // on the Manager and Teacher discriminator, not the main schema
      (<any>member).schools = [...(<any>member).schools, toObjectId(schoolId)];
      await member.save();
      return member;
    }
    else {
      return await this.schoolMember.create({
        account: toObjectId(userAccountId),
        schools: [toObjectId(schoolId)],
        role: 'MANAGER'
      });
    }
  }
}
