import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateInvitationCodeCommand,
  RegisterUserCommand,
  SignUpWithInvitationCommand,
  ValidateInvitationCodeCommand,
} from './user-social.commands';
import {
  User,
  UserDocument,
  InvitationCodeDocument,
  StudentPayload,
  TeacherPayload,
  ManagerDocument,
} from './user-social.schemas';
import {
  InvitationCodeInput,
  UserCreateInput,
  UserObject,
} from './user-social.objects';
import {
  School,
  SchoolDocument,
} from 'src/school-management/school-management.schemas';
import { CUser } from 'src/auth/user.decorator';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';
import { toObjectId } from 'src/utils/to-object-id';

@Resolver()
export class UserSocialServiceResolver {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @UseGuards(GqlJwtGuard, RoleGuard('isManager'))
  @Mutation(() => String)
  public async createInvitationCode(
    @Args('input') input: InvitationCodeInput,
    @CUser() manager: ManagerDocument,
  ) {

    // Todo: Move the validation logic inside the command
    const allowedRoles = ['TEACHER', 'STUDENT'];
    // validate input here
    if (!allowedRoles.includes(input.targetRole))
      throw new UnauthorizedException(
        'You can only invite students or teachers',
      );

    if (!(<string[]>(<unknown>manager.schools)).includes(input.targetSchool))
      throw new UnauthorizedException(
        'You can only invite students to schools that belong to you',
      );

    const code: InvitationCodeDocument = await this.commandBus.execute(
      new CreateInvitationCodeCommand(
        manager,
        input.targetRole,
        input.daysValid,
        input.targetSchool,
      ),
    );

    return code.id;
  }

  @Mutation(() => UserObject)
  public async signUpWithInviation(
    @Args('code') code: string,
    @Args('input') input: UserCreateInput,
  ) {
    try {
      const newUser = await this.commandBus.execute(
        new SignUpWithInvitationCommand(code, input)
      );
      return newUser;
    }
    catch(e) {
      switch(e.message) {
        case "code-invalid": throw new BadRequestException('The invitation code is invalid');
        case "code-expired": throw new BadRequestException('The invitation code is expired');
        case "manager-not-exists": throw new BadRequestException('The manager who invited you does not exist');
        case "school-not-exists": throw new BadRequestException('The school does not exist');
        case "could-not-register": throw new InternalServerErrorException('Could not register the user, try again later');
        case "username-taken": throw new BadRequestException('This username is already taken');
        default:
          throw e;
      }
    }
  }
}
