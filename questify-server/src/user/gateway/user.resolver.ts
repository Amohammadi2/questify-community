import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../domain/user.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { obtainAuthTokenInput } from './dto/obtain-auth-token.input';
import { ResultObject } from 'src/result.object';
import { ControlledError } from 'src/exceptions';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { getPasswordHash } from 'src/utils/get-password-hash';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() { return "Hello" }
  
  @Mutation(() => User)
  async requestRegistration(@Args("input") registerUserInput: RegisterUserInput) {
    const result = await this.userService.register(registerUserInput);

    if (result === "invalid-code") {
      throw new UnauthorizedException("The introduction code is invalid");
    }
    else if (result === "error") {
      throw new InternalServerErrorException("An error occurred while registering the user");
    }

    return result;
  }

  @Mutation(() => String)
  async obtainAuthToken(@Args("input") obtainAuthTokenInput: obtainAuthTokenInput) {
    const token = await this.userService.obtainAuthToken({
      ...obtainAuthTokenInput,
      password: getPasswordHash(obtainAuthTokenInput.password)
    });

    if (token === "invalid-credentials") {
      throw new UnauthorizedException('Please enter valid credentials');
    }

    return new String(token.token);
  }

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
