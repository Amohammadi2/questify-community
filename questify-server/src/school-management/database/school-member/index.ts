import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { UserAccount, UserAccountDoc } from "src/auth/database/user-account";
import { Payload } from "src/utils/payload";

export type SchoolMemberRole = 'MANAGER' | 'STUDENT' | 'TEACHER';

@Schema({ discriminatorKey: 'role' })
export class SchoolMember {
  @Prop({ type: String, required: true }) role: SchoolMemberRole;
  @Prop({ type: Types.ObjectId, ref: UserAccount.name, required: true }) account: UserAccountDoc;
}

export type SchoolMemberDoc = Document & SchoolMember;
export type SchoolMemberPayload = Payload<SchoolMember>;
export const schoolMemberSchema = SchemaFactory.createForClass(SchoolMember);


export * from "./manager";
export * from "./student";
export * from "./teacher";