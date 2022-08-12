import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  School,
  SchoolDocument
} from "src/school-management/database/school";
import { Payload } from 'src/utils/payload';
import { userSchema, UserPayload } from "..";

//#endregion
//#region Student Schema

@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: School.name, required: true })
  school: SchoolDocument;
}

export const studentSchema = SchemaFactory.createForClass(Student);
userSchema.discriminator('STUDENT', studentSchema);

export type StudentPayload = UserPayload & Payload<Student, null, { school: string; }>;
