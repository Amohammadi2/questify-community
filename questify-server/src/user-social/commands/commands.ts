import { UserCreateInput } from "../user-social.objects";
import { UserDocument, UserPayload, UserRole } from "../user-social.schemas";

export class CreateInvitationCodeCommand {
  constructor(
    public readonly user: UserDocument,
    public readonly targetRole: UserRole,
    public readonly daysValid: number,
    public readonly targetSchool: string
  ) {}
}

export class RegisterUserCommand <T extends UserPayload> {
  constructor(
    public readonly userInfo: T
  ) {}
}

export class SignUpWithInvitationCommand {
  constructor(
    public readonly code: string,
    public readonly userInfo: UserCreateInput
  ) {}
}