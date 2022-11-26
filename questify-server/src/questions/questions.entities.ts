import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { UserEntity } from 'src/auth/auth.entities';

@Schema()
export class Author {
  // Todo: replace all the user entity references with author
  // Todo: add `likedPosts`, 'savedPosts`
}

@Schema()
export class QuestionEntity {
  @Prop({ required: true }) content: string;
  @Prop({ type: S.Types.ObjectId, ref: UserEntity.name, required: true }) author: string;
  @Prop({ type: [String], required: true, default: [] }) tags: string[];
}

export type QuestionDoc = QuestionEntity & Document;
const QuestionSchema = SchemaFactory.createForClass(QuestionEntity);

@Schema()
export class AnswerEntity {
  @Prop({ required: true }) content: string;
  @Prop({ type: S.Types.ObjectId, ref: UserEntity.name, required: true }) author: string;
  @Prop({ type: S.Types.ObjectId, ref: QuestionEntity.name, required: true }) question: string;
}

export type AnswerDoc = AnswerEntity & Document;
const AnswerSchema = SchemaFactory.createForClass(AnswerEntity);

@Schema()
export class CommentEntity {
  @Prop({ required: true }) content: string;
  @Prop({ required: true, type: S.Types.ObjectId }) post: string;
  @Prop({ type: S.Types.ObjectId, ref: UserEntity.name, required: true }) author: string;
}

export type CommentDoc = CommentEntity & Document;
const CommentSchema = SchemaFactory.createForClass(CommentEntity);


/**
 * This model is intended for data denormalization and faster
 * tag listing in the api. The real source of truth is the `tags`
 * field on `Question` model
 */
@Schema()
export class QuestionTagEntity {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, default: 0 }) nOfPosts: number;
}

export type QuestionTagDoc = QuestionTagEntity & Document;
const QuestionTagSchema = SchemaFactory.createForClass(QuestionTagEntity);
