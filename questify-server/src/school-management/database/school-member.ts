import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Payload } from "src/utils/payload";
import { UserAccount, UserAccountDoc } from "../resources";

export type SchoolMemberRole = 'MANAGER' | 'STUDENT' | 'TEACHER'

@Schema()
export class SchoolMember {
  @Prop({ type: String, required: true }) role: SchoolMemberRole;
  @Prop({ type: Types.ObjectId, ref: UserAccount.name, required: true }) account: UserAccountDoc;
}

export type SchoolMemberDoc = Document & SchoolMember;
export type SchoolMemberPayload = Payload<SchoolMember>;
export const schoolMemberSchema = SchemaFactory.createForClass(SchoolMember);