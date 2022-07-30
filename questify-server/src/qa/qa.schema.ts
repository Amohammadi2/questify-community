import { ObjectType, Field, Int, OmitType, InputType, PartialType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserObject } from 'src/user-social/user-social.schemas';
import { User, UserDocument } from 'src/user-social/user-social.schemas';
import { Payload } from 'src/utils/payload';


 

interface QuestionBase {
  title: any;
  content: any;
  tags: any;
  author: any;
  score: any;
}

@Schema({ timestamps: true })
export class Question implements QuestionBase {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: ()=>[tagSchema], required: true })
  tags: Tag[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: UserDocument | string;

  @Prop({type: Number, required: true, default: 0 })
  score: number;

  constructor(props: Partial<QuestionBase>) {
    Object.assign(this, props);
  }
}

export type QuestionDocument = Question & Document;
export type QuestionPayload = Payload<Question, "score", { author: string, tags: string[] }>;
export const questionSchema = SchemaFactory.createForClass(Question);

@ObjectType({ isAbstract: true })
export class QuestionObject implements QuestionBase {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;
  
  @Field(() => String)
  content: string;
  
  @Field(() => [String])
  tags: string[];
  
  @Field(() => UserObject)
  author: UserObject;
  
  @Field(() => Int)
  score: number;
}

@InputType()
export class QuestionCreateInput extends OmitType(QuestionObject, ["author", "score", "id"], InputType) {}
@InputType()
export class QuestionUpdateInput extends PartialType(QuestionCreateInput, InputType) {}



@Schema()
export class Tag {
  @Prop() name: string;
}
export type TagDocument = Tag & Document;
export const tagSchema = SchemaFactory.createForClass(Tag);

 

export const models = [
  { name: Question.name, schema: questionSchema },
  { name: Tag.name, schema: tagSchema }
]