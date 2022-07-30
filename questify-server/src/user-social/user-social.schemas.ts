import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


//#region User Object
@Schema()
export class User {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
  
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserObject {
  @Field() username: string;
  @Field() id?: string;
}
//#endregion