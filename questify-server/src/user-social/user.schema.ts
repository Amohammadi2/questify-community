import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {

  @Prop({ required: true })
  @Field(()=>String)
  username: string;

  @Prop({ required: true })
  @Field(()=>String)
  password: string;

}

export const userSchema = SchemaFactory.createForClass(User);