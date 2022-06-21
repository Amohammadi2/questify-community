import { Injectable } from '@nestjs/common';
import { obtainAuthTokenInput } from 'src/user/gateway/dto/obtain-auth-token.input';

@Injectable()
export class AuthService {
  public async obtainAuthToken(obtainAuthTokenInput: obtainAuthTokenInput) {
    // Todo: move auth token obtainment logic here
  }
}
