import { Field, InputType } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload} from "graphql-upload";

@InputType()
export class AskQuestionInput {
  @Field() title: string;
  @Field() body: string;
  @Field(() => [String]) tags: string[];
  @Field(() => GraphQLUpload, { nullable: true }) coverImage: FileUpload;
  @Field(() => [GraphQLUpload]) attachments: FileUpload[];
}
