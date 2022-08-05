import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  School,
  SchoolDocument,
} from 'src/school-management/school-management.schemas';
import { Payload } from 'src/utils/payload';

export type UserRole = 'STUDENT' | 'MANAGER' | 'TEACHER' | 'ADMIN';

//#region User schema

export interface UserBase {
  username: any;
  password: any;
  role: any;
}

@Schema({ discriminatorKey: 'role' })
export class User implements UserBase {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, default: 'STUDENT' })
  role: UserRole;
}

export type UserDocument = User & Document;
export type UserPayload = Payload<User>;
export const userSchema = SchemaFactory.createForClass(User);

//#endregion

//#region Student Schema
@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: SchoolDocument;
}

export const studentSchema = SchemaFactory.createForClass(Student);
userSchema.discriminator('STUDENT', studentSchema);

export type StudentPayload = UserPayload & Payload<Student, null, { school: string }>;
//#endregion

//#region Admin Schema
@Schema()
export class Admin {
  @Prop({ type: Number, required: true, default: true }) isAdmin: boolean;
  // Probably, we'll need a set of privillages
  // for our admins to determine their access rights
}

export const adminSchema = SchemaFactory.createForClass(Admin);
userSchema.discriminator('ADMIN', adminSchema);
//#endregion

//#region Teacher Schema
@Schema()
export class Teacher {
  @Prop({ type: [Types.ObjectId], default: [], ref: School.name }) schools: SchoolDocument[];
}

export const teacherSchema = SchemaFactory.createForClass(Teacher);
userSchema.discriminator('TEACHER', teacherSchema);

export type TeacherPayload = UserPayload & Payload<Teacher, null, { schools: string[] }>;
//#endregion

//#region Manager Schema
@Schema()
export class Manager {
  @Prop({ type: [Types.ObjectId], ref: School.name, default: [] }) schools: SchoolDocument[];
}
export type ManagerDocument = Manager & UserDocument & Document
export const managerSchema = SchemaFactory.createForClass(Manager);
userSchema.discriminator('MANAGER', managerSchema);
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
  targetRole: UserRole;

  @Prop({ type: String, required: true })
  targetSchool: string;

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  ownerUser: UserDocument;

}
export const invitationCodeSchema =
  SchemaFactory.createForClass(InvitationCode);
export type InvitationCodeDocument = InvitationCode & Document;
//#endregion
