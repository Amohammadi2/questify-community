import { Injectable } from '@nestjs/common';
import { ObtainAuthTokenInput } from 'src/auth/gateway/dto/obtain-auth-token.input';
import { UserRepository } from 'src/user/persistance';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async obtainAuthToken(obtainAuthTokenInput: ObtainAuthTokenInput): Promise<{token: string} | "invalid-credentials"> {
    const result = await this.userRepository.findOneByAuthCredentials(obtainAuthTokenInput);
    if (result == "not-found") {
      return "invalid-credentials";
    }
    return {
      token: jwt.sign({ userId: result.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    };
  }

  public async verifyToken(token: string): Promise<"ok" | "invalid"> {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return "ok";
    } catch (e) {
      return "invalid";
    }
  }
}
