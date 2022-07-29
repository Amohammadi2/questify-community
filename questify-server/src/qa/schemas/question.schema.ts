import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from "mongoose";
import { User } from 'src/user-social/user.schema';
import { Tag, tagSchema } from './tag.schema';


@Schema()
export class Question extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) content: string;
  @Prop({ type: [tagSchema], required: true }) tags: Tag[];
  @Prop({ type: Types.ObjectId, ref:User.name }) author: User;
}

export const questionSchema = SchemaFactory.createForClass(Question);