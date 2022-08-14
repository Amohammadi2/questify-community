import {
  Field,
  Int,
  OmitType,
  PartialType,
  ObjectType,
  InputType,
} from '@nestjs/graphql';
import { UserAccountObject } from 'src/graphql/auth-graphql/typedefs/user-account.defs';
import { SchoolObject } from "src/graphql/school-management-graphql/typedefs/school.defs";

//#region Question Object
@ObjectType({ isAbstract: true })
export class QuestionObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => UserAccountObject)
  author: UserAccountObject;

  @Field(() => Int)
  score: number;
}

@InputType()
export class QuestionCreateInput extends OmitType(
  QuestionObject,
  ['author', 'score', 'id'],
  InputType,
) {}

@InputType()
export class QuestionUpdateInput extends PartialType(
  QuestionCreateInput,
  InputType,
) {}
//#endregion

//#region School Question Object
@ObjectType()
export class SchoolQuestionObject
  extends QuestionObject
{
  @Field() school: SchoolObject;
}

@InputType()
export class SchoolQuestionCreateInput extends OmitType(
  SchoolQuestionObject,
  ['author', 'score', 'id'],
  InputType,
) {}

@InputType()
export class SchoolQuestionUpdateInput extends PartialType(
  SchoolQuestionCreateInput,
) {}
//#endregion
