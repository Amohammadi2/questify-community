import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { SchoolDocument } from "src/school-management/school-management.schemas";


 
@Schema()
export class User {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, default: "STUDENT" })
  role: "STUDENT" | "MANAGER" | "TEACHER" |"ADMIN";

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: SchoolDocument;
  
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserObject {
  @Field() username: string;
  @Field() id?: string;
}
 