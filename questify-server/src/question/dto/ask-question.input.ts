import { Field, InputType } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from "src/plugins/graphql-file-upload";

@InputType()
export class AskQuestionInput {
  @Field() title: string;
  @Field() body: string;
  @Field(() => [String]) tags: string[];
  @Field(() => GraphQLUpload, { nullable: true }) coverImage: typeof FileUpload;
  @Field(() => [GraphQLUpload]) attachments: typeof FileUpload[];
}
