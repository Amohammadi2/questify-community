import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field() id: string;
  @Field() username: string;
  @Field() email: string;
  @Field() bio: string;
  @Field() profileImageUrl: string;
}
