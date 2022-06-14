import { Injectable } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { UserModel } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async register(registerUserInput: RegisterUserInput) {
    const user = UserModel.New(registerUserInput);
    await this.userRepository.save(user);
    return user;
  }
}
