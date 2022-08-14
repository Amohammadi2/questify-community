import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export const registerUserErrorMap = {
  'could-not-register': new InternalServerErrorException('Could not register the user, try again later'),
  'username-taken': new BadRequestException('This username is already taken'),
};

export const signUpWithInvitationErrorMap = {
  'code-invalid': new BadRequestException('The invitation code is invalid'),
  'code-expired': new BadRequestException('The invitation code is expired'),
  'manager-not-exists': new BadRequestException('The manager who invited you does not exist'),
  'school-not-exists': new BadRequestException('The school does not exist')
}