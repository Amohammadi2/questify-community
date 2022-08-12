import { SchoolPayload } from "../database/school";

export class CreateSchoolCommand {
  constructor(public readonly school: SchoolPayload) {}
}

export class UpdateSchoolCommand {
  constructor(
    public readonly id: string,
    public readonly school: Partial<SchoolPayload>,
  ) {}
}

export class DeleteSchoolCommand {
  constructor(public readonly id: string) {}
}

export class CreateInvitationCodeCommand {
  constructor(
    public readonly user: UserDocument,
    public readonly targetRole: UserRole,
    public readonly daysValid: number,
    public readonly targetSchool: string
  ) {}
}

export class SignUpWithInvitationCommand {
  constructor(
    public readonly code: string,
    public readonly userInfo: CreateUserInput
  ) {}
}

export class ChangeRoleCommand {
  constructor(
    public readonly userId: string,
    public readonly newRole: 'STUDENT' | 'TEACHER'
  ) {}
}