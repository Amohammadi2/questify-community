import { Injectable } from '@nestjs/common';
import { obtainAuthTokenInput } from '../gateway/dto/obtain-auth-token.input';
import { RegisterUserInput } from '../gateway/dto/register-user.input';
import { IntroductionCodeRepository, UserRepository } from '../persistance';
import { UserModel, UserRole } from './models';

const jwt = require('jsonwebtoken');

export type UserServiceErrorCodes = 'INVALID_CREDENTIALS'

@Injectable()
export class UserService {
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly introCodeRepository: IntroductionCodeRepository
  ) {}
  
  public async register(registerUserInput: RegisterUserInput): Promise<UserModel | "invalid-code" | "error"> {
    const code = await this.introCodeRepository.findByCode(registerUserInput.introductionCode);
    if (code === "not-found") {
      return "invalid-code";
    }

    const introductor = await this.introCodeRepository.getIntroductor(code);
    if (introductor === "not-found") {
      return "error";
    }

    const newUser = UserModel.init({ ...registerUserInput, role: UserRole.MANAGER });

    if ((await this.userRepository.save(newUser)) !== "save-failed") {
      if ((await this.userRepository.connectAsIntroductor(newUser, introductor)) === "ok") {
        return newUser;
      }
    }
    return "error";
  }

  // Todo: Move authentication logic to a separate service
  public async obtainAuthToken(obtainAuthTokenInput: obtainAuthTokenInput): Promise<{token: string} | "invalid-credentials"> {
    const result = await this.userRepository.findOneByAuthCredentials(obtainAuthTokenInput);
    if (result == "not-found") {
      return "invalid-credentials";
    }
    return {
      token: jwt.sign({ userId: result.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    };
  }
  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
