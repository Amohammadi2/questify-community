import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Payload } from "src/utils/payload";
import { UserAccount, UserAccountDoc } from "../resources";

@Schema()
export class UserProfile {
  @Prop({ required: true }) nickName: string;
  @Prop({ default: '' }) bio: string;
  @Prop({ default: [] }) followers: UserProfileDoc; 
  @Prop({ default: [] }) following: UserProfileDoc;
  @Prop({ type: Types.ObjectId, ref: UserAccount.name, required: true }) account: UserAccountDoc;
}

export type UserProfileDoc = UserProfile & Document;
export type UserProfilePayload = Payload<UserProfile, 'followers' | 'following' | 'bio'>
export const userProfileSchema = SchemaFactory.createForClass(UserProfile);
