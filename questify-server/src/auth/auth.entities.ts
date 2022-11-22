import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserEntity {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true, default: false }) isAdmin: boolean;
}

export type UserDoc = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const config = [
  { name: UserEntity.name, schema: UserSchema}
]