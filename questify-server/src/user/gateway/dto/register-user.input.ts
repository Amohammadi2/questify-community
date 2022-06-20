import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field() username: string;
  @Field() password: string;
  @Field() introductionCode: string;
}
