import {
  Field,
  Int,
  OmitType,
  PartialType,
  ObjectType,
  InputType,
} from '@nestjs/graphql';
import { SchoolObject } from "src/school-management/graphql/typedefs/school.defs";
import { UserInterface } from "src/user-social/graphql/typedefs/user/user.defs";
import { QuestionBase, SchoolQuestionBase } from './qa.schema';

//#region Question Object
@ObjectType({ isAbstract: true })
export class QuestionObject implements QuestionBase {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => UserInterface)
  author: UserInterface;

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
  implements SchoolQuestionBase
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
