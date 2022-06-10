import { v4 as uidV4 } from "uuid"
import { CommandBus, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "../commands/register-user.command";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { SendVerificationCodeCommand } from "../../mail/commands/send-verification-code";
import { generateVerificationCode } from "src/utils/generate-verification-code";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  
  constructor (
    private readonly userRepository: UserRepository,
  ) {} 
  
  public async execute(command: RegisterUserCommand) {
    const user = new UserEntity({
      uid: uidV4(),
      username: command.userDto.username,
      email: command.userDto.email,
      password: '',
    });

    return await this.userRepository.persist(user);
  }
}