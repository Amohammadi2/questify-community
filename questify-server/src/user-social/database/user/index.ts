import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payload } from 'src/utils/payload';

// re-export the discriminators
export * from "./discriminators/admin";
export * from "./discriminators/manager";
export * from "./discriminators/student";
export * from "./discriminators/teacher";

export type UserRole = 'STUDENT' | 'MANAGER' | 'TEACHER' | 'ADMIN';
//#region User schema

export interface UserBase {
  username: any;
  password: any;
  role: any;
}

@Schema({ discriminatorKey: 'role' })
export class User implements UserBase {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, required: true, default: 'STUDENT' })
  role: UserRole;

  @Prop({ default: true, required: true }) isActive: boolean;
}

export type UserDocument = User & Document;
export type UserPayload = Payload<User, 'isActive'>;
export const userSchema = SchemaFactory.createForClass(User);
