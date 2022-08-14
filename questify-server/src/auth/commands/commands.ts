import { UserAccountPayload } from "../database/user-account";

export class SetAccountActiveStatusCommand {
  constructor(
    public readonly userId: string,
    public readonly isActive: boolean
  ) {}
}

export class CreateUserAccountCommand {
  constructor(
    public readonly account: UserAccountPayload
  ) {}
}