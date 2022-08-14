import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserAccount, UserAccountDoc } from 'src/auth/database/user-account';
import { Payload } from 'src/utils/payload';
import { SchoolMemberRole } from './school-member';

//#endregion
//#region Invitation Code Schema
export interface InvitationCodeBase {
  daysValid: number;
  targetRole: any;
  targetSchool: any;
  ownerUser: any;
}

@Schema({ timestamps: true })
export class InvitationCode implements InvitationCodeBase {

  @Prop({ required: true })
  daysValid: number;

  @Prop({ type: String, required: true })
  targetRole: SchoolMemberRole;

  @Prop({ type: String, required: true })
  targetSchool: string;

  @Prop({ type: Types.ObjectId, required: true, ref: UserAccount.name })
  ownerUser: UserAccountDoc;

}
export const invitationCodeSchema = SchemaFactory.createForClass(InvitationCode);
export type InvitationCodeDocument = InvitationCode & Document;
export type InvitationCodePayload = Payload<InvitationCode>;