import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
