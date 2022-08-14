import { SchoolPayload } from "../database/school";
import { SchoolMemberRole } from "../database/school-member";

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
    public readonly userId: string,
    public readonly targetRole: SchoolMemberRole,
    public readonly daysValid: number,
    public readonly targetSchoolId: string
  ) {}
}

export class ChangeRoleCommand {
  constructor(
    public readonly userAccountID: string,
    public readonly newRole: 'STUDENT' | 'TEACHER'
  ) {}
}

export class SetSchoolActiveStatusCommand {
  constructor(
    public readonly schoolId: string,
    public readonly isActive: boolean
  ) {}
}

export class AddManagerCommand {
  constructor (
    public readonly schoolId: string,
    public readonly userAccountId: string
  ) {}
}