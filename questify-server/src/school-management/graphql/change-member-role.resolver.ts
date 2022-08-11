import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { CUser } from 'src/auth/user.decorator';
import { UserDocument } from 'src/user-social/user-social.schemas';
import { UpdateSchoolCommand } from '../commands/commands';
import {
  SchoolObject,
  SchoolUpdateInput
} from '../school-management.schemas';


@Resolver()
export class ChangeSchoolMemberRoleResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) { }

  @UseGuards(GqlJwtGuard, RoleGuard('isManagerOrAdmin'))
  @Mutation(() => SchoolObject)
  public async updateSchool(
    @Args('id') id: string,
    @Args('input') input: SchoolUpdateInput,
    @CUser() user: UserDocument
  ) {
    return await this.commandBus.execute(new UpdateSchoolCommand(id, input));
  }
}
