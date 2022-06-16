import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class obtainAuthTokenInput {
  @Field() username: string;
  @Field() password: string;
}