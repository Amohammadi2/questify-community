import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { School, SchoolDocument } from "src/school-management/database/school";
import { User, UserDocument } from "src/user-social/database/user";
import { Payload } from 'src/utils/payload';

export interface QuestionBase {
  title: any;
  content: any;
  tags: any;
  author: any;
  score: any;
}

//#region Question Schema
@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Question implements QuestionBase {

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: () => [tagSchema], required: true })
  tags: Tag[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: UserDocument | string;

  @Prop({ type: Number, required: true, default: 0 })
  score: number;

  constructor(props: Partial<QuestionBase>) {
    Object.assign(this, props);
  }
}

export type QuestionDocument = Question & Document;
export type QuestionPayload = Payload<
  Question,
  'score' | 'type',
  { author: string; tags: string[] }
>;
export const questionSchema = SchemaFactory.createForClass(Question);
//#endregion

//#region School Question Schema
export interface SchoolQuestionBase {
  school: any;
}
@Schema()
class SchoolQuestionSchema implements SchoolQuestionBase {
  @Prop({ type: Types.ObjectId, ref: School.name, required: true })
  school: SchoolDocument
}
const schoolQuestionSchema = SchemaFactory.createForClass(SchoolQuestionSchema);
questionSchema.discriminator('SCHOOL_QUESTION', schoolQuestionSchema);
export type SchoolQuestionDocument = SchoolQuestionSchema & QuestionDocument;
export type SchoolQuestionPayload = Payload<SchoolQuestionSchema, null, { school: string }> & QuestionPayload;
//#endregion

//#region Tag Schema
@Schema()
export class Tag {
  @Prop() name: string;
}
export type TagDocument = Tag & Document;
export const tagSchema = SchemaFactory.createForClass(Tag);

export const models = [
  { name: Question.name, schema: questionSchema },
  { name: Tag.name, schema: tagSchema },
];
//#endregion