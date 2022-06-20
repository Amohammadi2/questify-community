import { Injectable } from '@nestjs/common';
import { obtainAuthTokenInput } from '../gateway/dto/obtain-auth-token.input';
import { RegisterUserInput } from '../gateway/dto/register-user.input';
import { IntroductionCodeRepository, UserRepository } from '../persistance';
import jwt from "jsonwebtoken";

export type UserServiceErrorCodes = 'INVALID_CREDENTIALS'

@Injectable()
export class UserService {
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly introductionCodeRepository: IntroductionCodeRepository
  ) {}
  
  public async register(registerUserInput: RegisterUserInput): Promise<"ok" | "invalid-code"> {
    const code = await this.introductionCodeRepository.findByCode(registerUserInput.introductionCode);
    
    if (code === "not-found") {
      return "invalid-code";
    }

    
  }

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
