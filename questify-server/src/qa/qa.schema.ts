import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserAccount, UserAccountDoc } from 'src/auth/database/user-account';
import { School, SchoolDocument } from "src/school-management/database/school";
import { Payload } from 'src/utils/payload';

//#region Question Schema
@Schema({ timestamps: true, discriminatorKey: 'type' })
export class Question {

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: () => [tagSchema], required: true })
  tags: Tag[];

  @Prop({ type: Types.ObjectId, ref: UserAccount.name, required: true })
  author: UserAccountDoc;

  @Prop({ type: Number, required: true, default: 0 })
  score: number;
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
@Schema()
class SchoolQuestionSchema {
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