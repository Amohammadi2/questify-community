import {
  Field,
  InputType,
  ObjectType,
  PartialType
} from '@nestjs/graphql';


@ObjectType()
export class SchoolObject {
  @Field() id: string;
  @Field() name: string;
}

@InputType()
export class CreateSchoolInput {
  @Field() name: string;
}

@InputType()
export class UpdateSchoolInput extends PartialType(CreateSchoolInput) {}
