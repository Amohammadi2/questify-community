import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Payload } from "src/utils/payload";

@Schema()
export class UserAccount {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
}

export type UserAccountDoc = Document & UserAccount;
export type UserAccountPayload = Payload<UserAccount, null, { account: string }>;
export const userAccountSchema = SchemaFactory.createForClass(UserAccount);