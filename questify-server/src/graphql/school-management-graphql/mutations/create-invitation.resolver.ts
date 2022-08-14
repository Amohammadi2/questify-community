import {
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateInvitationCodeCommand } from '../../../school-management/commands';
import { InvitationCodeDocument } from "../../../school-management/database/invitation-code";
import { InvitationCodeCreateInput } from "../typedefs/invitation-code.defs";
import { CUser } from 'src/auth/user.decorator';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { MemberRoleGuard } from 'src/school-management/guards/member-role-gql.guard';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolMember, SchoolMemberDoc } from 'src/school-management/database/school-member';
import { Model } from 'mongoose';
import { toObjectId } from 'src/utils/to-object-id';
import { UserAccountDoc } from 'src/auth/database/user-account';


@Resolver()
export class CreateInvitationCodeResolver {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(SchoolMember.name) private readonly schoolMember: Model<SchoolMemberDoc>
  ) { }

  @UseGuards(GqlJwtGuard, MemberRoleGuard('isManager'))
  @Mutation(() => String)
  public async createInvitationCode(
    @Args('input') input: InvitationCodeCreateInput,
    @CUser() user: UserAccountDoc
  ) {

    // Todo: Move the validation logic inside the command
    const allowedRoles = ['TEACHER', 'STUDENT'];
    // validate input here
    if (!allowedRoles.includes(input.targetRole))
      throw new UnauthorizedException(
        'You can only invite students or teachers'
      );

    const manager: any = await this.schoolMember.find({ account: toObjectId(user.id) });

    if (!manager.schools.includes(toObjectId(input.targetSchool)))
      throw new UnauthorizedException(
        'You can only invite students to schools that belong to you'
      );

    const code: InvitationCodeDocument = await this.commandBus.execute(
      new CreateInvitationCodeCommand(
        user.id,
        input.targetRole,
        input.daysValid,
        input.targetSchool
      )
    );

    return code.id;
  }
}
