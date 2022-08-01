import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleCheckService } from 'src/auth/auth.service';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { UserDocument } from 'src/user-social/user-social.schemas';
import { CreateSchoolCommand } from './school-management.commands';
import {
  SchoolCreateInput,
  SchoolObject,
  SchoolUpdateInput,
} from './school-management.schemas';

@Resolver()
export class CreateSchoolResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleChecker: RoleCheckService,
  ) {}

  @UseGuards(GqlJwtGuard)
  @Mutation(() => SchoolObject)
  public async registerSchool(
    @Args('input') input: SchoolCreateInput,
    @CUser() user: UserDocument,
  ) {
    if (user && this.roleChecker.isManagerOrAdmin(user))
      return await this.commandBus.execute(new CreateSchoolCommand(input));
    throw new UnauthorizedException(
      'Only Teachers and Managers can register schools',
    );
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => SchoolObject)
  public async updateSchool(
    @Args('input') input: SchoolUpdateInput,
    @CUser() user: UserDocument,
  ) {
    // Todo: implement
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => SchoolObject)
  public async removeSchool(
    @Args('input') input: SchoolUpdateInput,
    @CUser() user: UserDocument,
  ) {
    // Todo: implement
  }
}

export const resolvers = [CreateSchoolResolver];
