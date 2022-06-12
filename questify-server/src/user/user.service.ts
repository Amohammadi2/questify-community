import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { generateVerificationCode } from 'src/utils/generate-verification-code';
import { RegisterUserInput } from './dto/register-user.input';
import { VerifyUserInput } from './dto/verify-user.input';
import { UserModel } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { VerificationInfoRepository } from './repositories/verification-info.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly verificationInfoRepository: VerificationInfoRepository,
    private readonly mailService: MailService  
  ) {}

  public async register(registerUserInput: RegisterUserInput) {
    const user = UserModel.New(registerUserInput);
    await this.userRepository.save(user);

    // user verification
    const code = generateVerificationCode();
    await this.mailService.sendVerificationEmail({ user, code });
    // save to db for later verification
    this.verificationInfoRepository.save({
      userId: user.id,
      verificationCode: code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    return user;
  }

  public async verifyUser(verifyUserInput: VerifyUserInput) {
    
  }

}
