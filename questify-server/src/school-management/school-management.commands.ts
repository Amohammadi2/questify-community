import { SchoolPayload } from './school-management.schemas';

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

export class ChangeRoleCommand {
  constructor(
    public readonly userId: string,
    public readonly newRole: 'STUDENT' | 'TEACHER'
  ) {}
}