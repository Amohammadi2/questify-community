import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Payload } from 'src/utils/payload';
import { School, SchoolDocument } from '../school';
import { SchoolMemberDoc, SchoolMemberPayload, schoolMemberSchema } from './index';

@Schema()
export class Teacher {
  @Prop({ type: [Types.ObjectId], ref: School.name, required: true })
  schools: [SchoolDocument];
}

export type TeacherDoc = Teacher & SchoolMemberDoc;
export type TeacherPayload = Payload<Teacher, null, { schools: string}> & SchoolMemberPayload;
export const teacherSchema = SchemaFactory.createForClass(Teacher);

schoolMemberSchema.discriminator('TEACHER', teacherSchema);