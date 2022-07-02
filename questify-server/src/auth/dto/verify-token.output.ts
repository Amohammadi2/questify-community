import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/gateway/entities/user.entity";

@ObjectType()
export class VerifyTokenOutput {
  @Field() user: User;
}