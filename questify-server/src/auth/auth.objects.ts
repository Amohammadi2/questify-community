import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
  @Field() accessToken: string;
  // @Field() refreshToken: string; // Todo: we'll add this later on
}

@ObjectType()
export class User {
  @Field() id: string;
  @Field() username: string;
}