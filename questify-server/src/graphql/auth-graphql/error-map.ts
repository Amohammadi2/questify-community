import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export const createUserAccountErrorMap = {
  'could-not-register': new InternalServerErrorException('Could not register the user, try again later'),
  'username-taken': new BadRequestException('This username is already taken'),
};