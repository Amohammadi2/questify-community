import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Payload } from "src/utils/payload";

@Schema()
export class UserAccount {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop({ default: true, required: true }) isActive: boolean; 
  @Prop({ default: false, required: true }) isAdmin: boolean;
}

export type UserAccountDoc = UserAccount & Document;
export type UserAccountPayload = Payload<UserAccount, 'isActive' | 'isAdmin'>;
export const userAccountSchema = SchemaFactory.createForClass(UserAccount);