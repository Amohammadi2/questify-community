import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Payload } from 'src/utils/payload';

interface SchoolBase {
  name: any;
}

@Schema()
export class School implements SchoolBase {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, default: true }) isActive: boolean;
}
export type SchoolDocument = School & Document;
export type SchoolPayload = Payload<School, "isActive">;
export const schoolSchema = SchemaFactory.createForClass(School);

@ObjectType()
export class SchoolObject implements SchoolBase {
  @Field() id: string;
  @Field() name: string;
}
@InputType()
export class SchoolCreateInput extends OmitType(
  SchoolObject,
  ['id'],
  InputType,
) {}
@InputType()
export class SchoolUpdateInput extends PartialType(
  SchoolCreateInput,
  InputType,
) {}

export const models = [{ name: School.name, schema: schoolSchema }];
