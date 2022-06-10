import { RegisterUserDto } from "../dtos/regiser-user.dto";

export class RegisterUserCommand {
  constructor(
    public readonly userDto: RegisterUserDto,
  ) {}
}