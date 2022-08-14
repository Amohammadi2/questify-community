import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Payload } from 'src/utils/payload';
import { School, SchoolDocument } from '../school';
import { SchoolMemberDoc, SchoolMemberPayload, schoolMemberSchema } from './index';

@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: School.name, required: true })
  school: SchoolDocument;
}

export type StudentDoc = Student & SchoolMemberDoc;
export type StudentPayload = Payload<Student, null, { schools: string}> & SchoolMemberPayload;
export const studentSchema = SchemaFactory.createForClass(Student);

schoolMemberSchema.discriminator('STUDENT', studentSchema);