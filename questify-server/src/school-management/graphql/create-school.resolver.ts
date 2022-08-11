import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { UserDocument } from 'src/user-social/user-social.schemas';
import { CreateSchoolCommand } from '../commands/commands';
import {
  SchoolCreateInput,
  SchoolObject
} from '../school-management.schemas';



@Resolver()
export class CreateSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => SchoolObject)
  public async registerSchool(
    @Args('input') input: SchoolCreateInput,
    @CUser() user: UserDocument
  ) {
    return await this.commandBus.execute(new CreateSchoolCommand(input));
  }
}
