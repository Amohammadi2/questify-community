import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { SchoolDocument, schoolSchema } from "src/school-management/school-management.schemas";


//#region User schema
@Schema({ discriminatorKey: "role" })
export class User {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, default: "STUDENT" })
  role: "STUDENT" | "MANAGER" | "TEACHER" |"ADMIN";

}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserObject {
  @Field() username: string;
  @Field() id?: string;
}

//#endregion

//#region Student Schema
@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: SchoolDocument;
}

export const studentSchema = SchemaFactory.createForClass(Student);
userSchema.discriminator('STUDENT', studentSchema);
//#endregion

//#region Admin Schema
@Schema()
export class Admin {
  @Prop({ type: Number, required: true, default: true }) isAdmin: boolean;
  // Todo: Probably, we'll need a set of privillages 
  //       for our admins to determine their access rights
}

export const adminSchema = SchemaFactory.createForClass(Admin)
userSchema.discriminator('ADMIN', adminSchema);
//#endregion

//#region Teacher Schema
@Schema()
export class Teacher {
  @Prop({ type: [schoolSchema], default: [] }) schools: SchoolDocument[];
}

export const teacherSchema = SchemaFactory.createForClass(Teacher);
userSchema.discriminator('TEACHER', teacherSchema);
//#endregion

//#region Manager Schema
@Schema()
export class Manager {
  @Prop({ type: [schoolSchema], default: []}) schools: SchoolDocument[];
}
export const managerSchema = SchemaFactory.createForClass(Manager);
userSchema.discriminator('MANAGER', managerSchema);
//#endregion