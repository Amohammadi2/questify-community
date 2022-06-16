import { Injectable } from '@nestjs/common';
import { obtainAuthTokenInput } from '../gateway/dto/obtain-auth-token.input';
import { RegisterUserInput } from '../gateway/dto/register-user.input';
import { UpdateUserInput } from '../gateway/dto/update-user.input';
import { UserRepoErrorCodes, UserRepository } from '../persistance/user.repository';
import { UserNeo4j } from "../persistance/user.neo4j.interface"
import { Result } from 'src/exceptions';
import { UserModel } from './user.model';
import { UserMapper } from '../persistance/user.mapper';

export type UserServiceErrorCodes = UserRepoErrorCodes | 'INVALID_CREDENTIALS'

@Injectable()
export class UserService {
  
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper
  ) {}
  
  public async register(registerUserInput: RegisterUserInput) {

  }

  public async obtainAuthToken(obtainAuthTokenInput: obtainAuthTokenInput)
  : Promise<Result<UserModel, UserServiceErrorCodes>> {
    const result = (await this.userRepository.findByAuthCredentials(obtainAuthTokenInput))
      .unwrap<UserServiceErrorCodes>(err => {
        if (err.code == 'USER_NOT_FOUND') 
          return 'INVALID_CREDENTIALS';
        return err.code;
      });

    if (result == 'INVALID_CREDENTIALS') {
      return new Result({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Please enter valid credentials'
        }
      })
    }

    if (!(result instanceof UserNeo4j)) {
      return new Result({ error: { code: result }});
    }

    return new Result({ result: this.userMapper.toDomainModel(result) })
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
