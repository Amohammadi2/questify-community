import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Tag extends Document {
  @Prop() name: string;
}

export const tagSchema = SchemaFactory.createForClass(Tag);