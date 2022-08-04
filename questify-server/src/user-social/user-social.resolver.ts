import { BadRequestException, InternalServerErrorException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateInvitationCodeCommand,
  RegisterUserCommand,
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
import { InvitationCodeInput, UserCreateInput, UserObject } from './user-social.objects';
import { School, SchoolDocument } from 'src/school-management/school-management.schemas';
import { CUser } from 'src/auth/user.decorator';
import { GqlJwtGuard } from 'src/auth/guards/jwt-gql.guard';
import { RoleGuard } from 'src/auth/guards/role-gql.guard';

@Resolver()
export class UserSocialServiceResolver {

  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(School.name) private readonly schoolModel: Model<SchoolDocument>
  ) {}

  @UseGuards(GqlJwtGuard, RoleGuard('isManager'))
  @Mutation(() => String)
  public async createInvitationCode(
    @Args('input') input: InvitationCodeInput,
    @CUser() manager: ManagerDocument
  ) {

    const allowedRoles = ["TEACHER", "STUDENT"];
    
    // validate input here
    if (!allowedRoles.includes(input.targetRole))
      throw new UnauthorizedException("You can only invite students or teachers");

    console.log(manager.schools, input.targetSchool);
    if (!(<string[]><unknown>manager.schools).includes(input.targetSchool))
      throw new UnauthorizedException("You can only invite students to schools that belong to you");

    const code: InvitationCodeDocument = await this.commandBus.execute(
      new CreateInvitationCodeCommand(manager, input.targetRole, input.daysValid, input.targetSchool)
    );

    return code.id;
  }

  @Mutation(() => UserObject)
  public async signUpWithInviation(
    @Args('code') code: string,
    @Args('input') input: UserCreateInput,
  ) {

    // Todo: resolve the error handling issue not catching the expected errors

    const validityStatus = await this.commandBus.execute(
      new ValidateInvitationCodeCommand(code),
    );

    // handle error cases
    if (validityStatus == 'not-found')
      throw new BadRequestException('The invitation code is invalid');
    else if (validityStatus == 'expire')
      throw new BadRequestException('The invitation code has been expired');

    // if there are no errors, the object will be returned
    const codeObj: InvitationCodeDocument = validityStatus;

    // make sure the manager still exists
    const manager = this.userModel.findOne({
      id: codeObj.ownerUser,
      role: 'MANAGER',
    }) as unknown as ManagerDocument;
    if (!manager)
      throw new UnauthorizedException(
        'The one who has invited you is now out of the system',
      );

    // make sure the school still exists
    const school = this.schoolModel.findOne({ id: codeObj.targetSchool });
    if (!school)
      throw new BadRequestException(
        'The school that you have been invited to is now deleted from the system'
      );

    // register the user based on roles
    let user = null;
    switch (codeObj.targetRole) {
      case 'STUDENT':
        user = await this.commandBus.execute(
          new RegisterUserCommand<StudentPayload>({
            ...input,
            role: codeObj.targetRole,
            school: codeObj.targetSchool,
          }),
        );
        break;
      case 'TEACHER':
        user = await this.commandBus.execute(
          new RegisterUserCommand<TeacherPayload>({
            ...input,
            role: codeObj.targetRole,
            schools: [codeObj.targetSchool],
          }),
        );
        break;
    }

    if (!user)
      throw new InternalServerErrorException("Could not register user into the system");
    
    return user;
  }
}
