import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ObtainAuthTokenInput {
  @Field() username: string;
  @Field() password: string;
}