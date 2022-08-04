import { UserDocument, UserPayload, UserRole } from "./user-social.schemas";

export class CreateInvitationCodeCommand {
  constructor(
    public readonly user: UserDocument,
    public readonly targetRole: UserRole,
    public readonly daysValid: number,
    public readonly targetSchool: string
  ) {}
}

export class ValidateInvitationCodeCommand {
  constructor(
    public readonly codeId: string
  ) {}
}

export class RegisterUserCommand <T extends UserPayload> {
  constructor(
    public readonly userInfo: T
  ) {}
}
