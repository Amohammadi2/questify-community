import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ErrorObject {
  @Field() message: string;
  @Field() code: string;
}

@ObjectType()
export class ResultObject <T> {
  @Field(() => Boolean, { nullable: true }) success?: boolean;
  @Field(() => ErrorObject, { nullable: true }) error?: ErrorObject;
  @Field() data?: T;
}