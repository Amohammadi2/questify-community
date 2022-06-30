import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class QuestionEntity {
  @Field() title: string;
  @Field() body: string;
  @Field(() => [String]) tags: string[];
  @Field() coverImageUrl: string;
  @Field(() => [String]) attachmentUrls: string[];
  @Field() isFollowing: boolean;
  @Field() hasSaved: boolean;
  @Field(() => Int) scores: Number;
}