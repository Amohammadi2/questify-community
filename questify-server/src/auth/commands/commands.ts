export class RegisterUserCommand <T extends UserPayload> {
  constructor(
    public readonly userInfo: T
  ) {}
}

