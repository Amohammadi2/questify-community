import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import {
  CreateInvitationCodeCommand,
  RegisterUserCommand,
  SignUpWithInvitationCommand,
  ValidateInvitationCodeCommand,
} from './user-social.commands';
import {
  InvitationCode,
  InvitationCodeDocument,
  UserDocument,
  User,
  StudentPayload,
  TeacherPayload,
  ManagerDocument,
} from './user-social.schemas';
import * as bcrypt from 'bcrypt';
import {
  School,
  SchoolDocument,
} from 'src/school-management/school-management.schemas';

@CommandHandler(CreateInvitationCodeCommand)
export class CreateInvitationCodeHandler
  implements ICommandHandler<CreateInvitationCodeCommand>
{
  constructor(
    @InjectModel(InvitationCode.name)
    private readonly invitationCodeModel: Model<InvitationCodeDocument>,
  ) {}

  async execute(command: CreateInvitationCodeCommand) {
    return await this.invitationCodeModel.create({
      daysValid: command.daysValid,
      ownerUser: command.user.id,
      targetRole: command.targetRole,
      targetSchool: command.targetSchool,
    });
  }
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand<any>>
{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(command: RegisterUserCommand<any>) {
    if (await this.userModel.exists({ username: command.userInfo.username }))
      throw Error('username-taken');
    const payload = {
      ...command.userInfo,
      password: bcrypt.hashSync(
        command.userInfo.password,
        bcrypt.genSaltSync(),
      ),
    };
    const user = await this.userModel.create(payload);
    if (!user) throw Error('could-not-register');
    return user;
  }
}

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
    private readonly invitationCodeModel: Model<InvitationCodeDocument>,
  ) {}

  private async checkInvitationCode(codeId: string) {
    try {
      const codeObj = await this.invitationCodeModel.findById(
        toObjectId(codeId),
      );
      if (!codeObj) throw Error('code-invalid');
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
    if (
      (await this.userModel.exists({ id: toObjectId(codeDoc.ownerUser) })) ===
      null
    )
      throw Error('manager-not-exists');
  }

  private async checkSchoolExists(codeDoc: InvitationCodeDocument) {
    if (
      (await this.schoolModel.exists(toObjectId(codeDoc.targetSchool))) === null
    )
      throw Error('school-not-exists');
  }

  async execute({ code, userInfo }: SignUpWithInvitationCommand) {
    // validate the code
    const codeDoc: InvitationCodeDocument = await this.checkInvitationCode(
      code,
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
          }),
        );
        break;
      // register a teacher
      case 'TEACHER':
        user = await this.commandBus.execute(
          new RegisterUserCommand<TeacherPayload>({
            ...userInfo,
            role: codeDoc.targetRole,
            schools: [codeDoc.targetSchool],
          }),
        );
        break;
    }
    return user;
  }
}

export const handlers = [
  CreateInvitationCodeHandler,
  RegisterUserHandler,
  SignUpWithInvitationHandler,
];
