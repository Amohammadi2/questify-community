import { UserEntity } from "../../user/entities/user.entity";

export class SendVerificationCodeCommand {
  constructor (
    public readonly user: UserEntity,
    public readonly code: string
  ) {}
}