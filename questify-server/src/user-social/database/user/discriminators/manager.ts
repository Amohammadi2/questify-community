import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  School,
  SchoolDocument
} from "src/school-management/database/school";
import { Payload } from 'src/utils/payload';
import { UserDocument, UserPayload, userSchema } from "..";

//#endregion
//#region Manager Schema
export interface ManagerBase {
  schools: any;
}
@Schema()
export class Manager {
  @Prop({ type: [Types.ObjectId], ref: School.name, default: [] }) schools: SchoolDocument[];
}
export type ManagerDocument = Manager & UserDocument & Document;
export type ManagerPayload = Payload<Manager, null, { schools: Types.ObjectId[]; }> & UserPayload;
export const managerSchema = SchemaFactory.createForClass(Manager);
userSchema.discriminator('MANAGER', managerSchema);
