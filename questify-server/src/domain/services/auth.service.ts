import { CredentialsDTO } from "../dtos/credentials.dto";
import { IJwtService } from "../integrations/jwt.service.integration";
import { UserRepository } from "../entities/user/user.repository";
import { NotFoundErr } from '../exceptions/not-found.exception';
import { AuthTokenPayloadDTO } from "../dtos/auth-token-payload.dto";

export class AuthService {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: IJwtService
  ) {}

  async login(credentials : CredentialsDTO) {
    const user = await this.userRepo.findByCredentials(credentials);
    if (user == null)
      throw new NotFoundErr('No user with this credentials was found');
    const username = user.getUsername(), id = user.getId();
    return {
      token: await this.jwtService.encode({ username, id } as AuthTokenPayloadDTO),
      user
    };
  }

  async verify(token: string) {
    return await this.jwtService.verify(token);
  }

}