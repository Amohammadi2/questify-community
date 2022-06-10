import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SendVerificationCodeCommand } from 'src/mail/commands/send-verification-code';
import { generateVerificationCode } from 'src/utils/generate-verification-code';
import { RegisterUserCommand } from './commands/register-user.command';
import { RegisterUserDto } from './dtos/regiser-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor (
    private readonly commandBus: CommandBus,
  ){}
  
  public async register(regiserUserDto: RegisterUserDto) {
    const user = await this.commandBus.execute(new RegisterUserCommand(regiserUserDto)) as UserEntity;
    await this.commandBus.execute(
      new SendVerificationCodeCommand(user, generateVerificationCode())
    );
  }
}