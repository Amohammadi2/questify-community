import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserAccount, UserAccountDoc } from "src/auth/database/user-account";
import { Payload } from "src/utils/payload";

@Schema()
export class UserProfile {
  @Prop({ required: true }) nickName: string;
  @Prop({ default: '' }) bio: string;
  @Prop({ type: [Types.ObjectId], default: [] }) followers: UserProfileDoc; 
  @Prop({ type: [Types.ObjectId], default: [] }) following: UserProfileDoc;
  @Prop({ type: Types.ObjectId, ref: UserAccount.name, required: true }) account: UserAccountDoc;
}

export type UserProfileDoc = UserProfile & Document;
export type UserProfilePayload = Payload<UserProfile, 'followers' | 'following' | 'bio'>
export const userProfileSchema = SchemaFactory.createForClass(UserProfile);
