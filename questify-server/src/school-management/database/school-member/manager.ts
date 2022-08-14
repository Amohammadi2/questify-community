import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Payload } from 'src/utils/payload';
import { School, SchoolDocument } from '../school';
import { SchoolMemberDoc, SchoolMemberPayload, schoolMemberSchema } from './index';

@Schema()
export class Manager {
  @Prop({ type: [Types.ObjectId], ref: School.name, required: true, default: [] })
  schools: SchoolDocument[];
}

export type ManagerDoc = Manager & SchoolMemberDoc;
export type ManagerPayload = Payload<Manager, null, { schools: string}> & SchoolMemberPayload;
export const managerSchema = SchemaFactory.createForClass(Manager);

schoolMemberSchema.discriminator('MANAGER', managerSchema);