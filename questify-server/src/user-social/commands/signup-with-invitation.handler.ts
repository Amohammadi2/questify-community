import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import {
  RegisterUserCommand,
  SignUpWithInvitationCommand
} from './commands';
import {
  InvitationCode,
  InvitationCodeDocument,
  UserDocument,
  User,
  StudentPayload,
  TeacherPayload
} from '../user-social.schemas';
import {
  School,
  SchoolDocument
} from 'src/school-management/school-management.schemas';


@CommandHandler(SignUpWithInvitationCommand)
export class SignUpWithInvitationHandler
  implements ICommandHandler<SignUpWithInvitationCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectModel(InvitationCode.name)
    private readonly invitationCodeModel: Model<InvitationCodeDocument>
  ) { }

  private async checkInvitationCode(codeId: string) {
    try {
      const codeObj = await this.invitationCodeModel.findById(
        toObjectId(codeId)
      );
      if (!codeObj)
        throw Error('code-invalid');
      const validDays = codeObj.daysValid * 24 * 60 * 60 * 1000;
      const diff = new Date().getTime() - (<any>codeObj).createdAt.getTime();
      if (diff > validDays)
        throw Error('code-expired');
      return codeObj;
    } catch (e) {
      throw Error(e.message.startsWith('code-') ? e.message : 'code-invalid');
    }
  }

  private async checkManagerExists(codeDoc: InvitationCodeDocument) {
    if ((await this.userModel.exists({ id: toObjectId(codeDoc.ownerUser) })) ===
      null)
      throw Error('manager-not-exists');
  }

  private async checkSchoolExists(codeDoc: InvitationCodeDocument) {
    if ((await this.schoolModel.exists(toObjectId(codeDoc.targetSchool))) === null)
      throw Error('school-not-exists');
  }

  async execute({ code, userInfo }: SignUpWithInvitationCommand) {
    // validate the code
    const codeDoc: InvitationCodeDocument = await this.checkInvitationCode(
      code
    );
    await this.checkManagerExists(codeDoc);
    await this.checkSchoolExists(codeDoc);
    let user = null;
    switch (codeDoc.targetRole) {
      // register a student
      case 'STUDENT':
        user = await this.commandBus.execute(
          new RegisterUserCommand<StudentPayload>({
            ...userInfo,
            role: codeDoc.targetRole,
            school: codeDoc.targetSchool,
          })
        );
        break;
      // register a teacher
      case 'TEACHER':
        user = await this.commandBus.execute(
          new RegisterUserCommand<TeacherPayload>({
            ...userInfo,
            role: codeDoc.targetRole,
            schools: [codeDoc.targetSchool],
          })
        );
        break;
    }
    return user;
  }
}
