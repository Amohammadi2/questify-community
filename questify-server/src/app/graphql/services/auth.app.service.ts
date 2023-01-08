import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CredentialsDTO } from "src/domain/dtos/credentials.dto";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { AppJwtService } from "src/infrastructure/jwt/jwt.service";
import { AuthTokenPayload } from "../dtos/auth-token-payload.dto";

@Injectable()
export class AuthAppService {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtService: AppJwtService
  ) {}

  async login(credentails: CredentialsDTO) {
    const user = await this.userRepository.findByCredentials(credentails);
    console.log('User Found: ', user);
    if (!user) throw new UnauthorizedException('No user matched your credentials');
    const token = this.jwtService.encode({
      username: user.getUsername(),
      userId: user.getId()
    } as AuthTokenPayload);
    return { token, user };
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }

  async decode(token: string) {
    const content = this.jwtService.decode(token);
    if (typeof content == "string")
      return { content }
    return content;
  }

  async isUsernameFree(username: string): Promise<boolean> {
    return !(await this.userRepository.checkUsernameExists(username));
  }
}