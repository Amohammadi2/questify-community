import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserEntity {
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) password: string;
}

export type UserDoc = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const config = [
  { name: UserEntity.name, schema: UserSchema}
]