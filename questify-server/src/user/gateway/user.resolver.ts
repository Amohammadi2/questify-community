import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../domain/user.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { obtainAuthTokenInput } from './dto/obtain-auth-token.input';
import { ResultObject } from 'src/result.object';
import { ControlledError } from 'src/exceptions';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() { return "Hello" }
  
  @Mutation(() => User)
  async requestRegistration(@Args("input") registerUserInput: RegisterUserInput) {
    return await this.userService.register(registerUserInput);
  }

  @Mutation(() => String)
  async obtainAuthToken(@Args("input") obtainAuthTokenInput: obtainAuthTokenInput) {
    const token = await this.userService.obtainAuthToken(obtainAuthTokenInput);

    if (token === "invalid-credentials") {
      throw new UnauthorizedException('Please enter valid credentials');
    }

    return new String(token);
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
