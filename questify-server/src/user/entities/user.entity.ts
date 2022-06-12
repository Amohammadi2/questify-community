import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType()
export class User {
  @Field() public id: string;
  @Field() public username: string;
}
