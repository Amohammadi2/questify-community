import { BadRequestException } from "@nestjs/common";

export const addManagerErrorMap = {
  'invalid-account-id': new BadRequestException('The account id is invalid'),
  'invalid-school-id': new BadRequestException('The school id is invalid'),
}