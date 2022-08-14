import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserAccountObject {
  @Field() id?: string;
  @Field() username: string;
}

@InputType()
export class CreateUserAccountInput {
  @Field() username: string;
  @Field() password: string;
}