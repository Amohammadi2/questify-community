import { Field, InputType, Resolver } from "@nestjs/graphql";

@InputType()
export class GetAuthTokenInput {
  @Field() username: string;
  @Field() password: string;
}