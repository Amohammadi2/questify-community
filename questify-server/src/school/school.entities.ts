import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as S } from "mongoose";

@Schema()
export class SchoolEntity {
  @Prop() name: string;
}

export type SchoolDoc = SchoolEntity & Document;
const SchoolSchema = SchemaFactory.createForClass(SchoolEntity);

@Schema()
export class RegistrationRequestEntity {
  @Prop() schoolName: string;
  @Prop() managerName: string;
  @Prop() managerEmail: string;
  @Prop() managerPhoneNumber: string;
}

export type RegistrationRequestDoc = RegistrationRequestEntity & Document;
const RegistrationRequestSchema = SchemaFactory.createForClass(RegistrationRequestEntity);

@Schema()
export class InvitationEntity {
  @Prop({ type: S.Types.ObjectId }) schoolId: string;
}

export type InvitationDoc = InvitationEntity & Document;
const InvitationSchema = SchemaFactory.createForClass(InvitationEntity);


@Schema()
export class SchoolMemberEntity {
  @Prop() role: 'student' | 'teacher' | 'manager';
  @Prop() schools: string[];
}

export type SchoolMemberDoc = SchoolMemberEntity & Document;
const SchoolMemberSchema = SchemaFactory.createForClass(SchoolMemberEntity);

export const entities = [
  { name: SchoolEntity.name, schema: SchoolSchema },
  { name: RegistrationRequestEntity.name, schema: RegistrationRequestSchema },
  { name: InvitationEntity.name, schema: InvitationSchema },
  { name: SchoolMemberEntity.name, schema: SchoolMemberSchema }, 
];