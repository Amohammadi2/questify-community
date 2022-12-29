import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CredentialsDTO } from "src/domain/dtos/credentials.dto";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { AuthTokenPayload } from "../dtos/auth-token-payload.dto";

@Injectable()
export class AuthAppService {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(credentails: CredentialsDTO) {
    const user = await this.userRepository.findByCredentials(credentails);
    if (!user) throw new UnauthorizedException('No user matched your credentials');
    const token = this.jwtService.sign({
      username: user.getUsername(),
      userId: user.getId()
    } as AuthTokenPayload);
    return { token, user };
  }

}