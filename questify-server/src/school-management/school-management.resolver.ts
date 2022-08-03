import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleCheckService } from 'src/auth/auth.service';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { UserDocument } from 'src/user-social/user-social.schemas';
import { ChangeRoleCommand, CreateSchoolCommand, DeleteSchoolCommand, UpdateSchoolCommand } from './school-management.commands';
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

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => SchoolObject)
  public async registerSchool(
    @Args('input') input: SchoolCreateInput,
    @CUser() user: UserDocument,
  ) {
    return await this.commandBus.execute(new CreateSchoolCommand(input));
  }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => SchoolObject)
  public async updateSchool(
    @Args('id') id: string,
    @Args('input') input: SchoolUpdateInput,
    @CUser() user: UserDocument,
  ) {
    return await this.commandBus.execute(new UpdateSchoolCommand(id, input));
  }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => Boolean)
  public async removeSchool(
    @Args('id') id: string,
    @CUser() user: UserDocument,
  ) {
    return await this.commandBus.execute(new DeleteSchoolCommand(id));
  }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => Boolean)
  public async changeSchoolMemberRole(
    @Args('userId') userId: string,
    @Args('newRole') newRole: 'STUDENT' | 'TEACHER'
  ) {
    return await this.commandBus.execute(new ChangeRoleCommand(userId, newRole));
  }
}

export const resolvers = [CreateSchoolResolver];
