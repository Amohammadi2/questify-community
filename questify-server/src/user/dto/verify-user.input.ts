import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class VerifyUserInput {
  @Field() id: string;
  @Field() verificationCode: string;
}