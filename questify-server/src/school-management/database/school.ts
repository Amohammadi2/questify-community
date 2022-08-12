import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Payload } from 'src/utils/payload';


@Schema()
export class School {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, default: true }) isActive: boolean;
}
export type SchoolDocument = School & Document;
export type SchoolPayload = Payload<School, "isActive">;
export const schoolSchema = SchemaFactory.createForClass(School);
