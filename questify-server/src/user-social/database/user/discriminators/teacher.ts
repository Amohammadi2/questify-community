import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  School,
  SchoolDocument
} from "src/school-management/database/school";
import { Payload } from 'src/utils/payload';
import { userSchema, UserPayload } from "..";

//#endregion
//#region Teacher Schema
@Schema()
export class Teacher {
  @Prop({ type: [Types.ObjectId], default: [], ref: School.name }) schools: SchoolDocument[];
}

export const teacherSchema = SchemaFactory.createForClass(Teacher);
userSchema.discriminator('TEACHER', teacherSchema);

export type TeacherPayload = UserPayload & Payload<Teacher, null, { schools: string[]; }>;
