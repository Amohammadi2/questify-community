import { Field, InputType } from "@nestjs/graphql";
import { UserCredentialsInput } from "./user-credentials.input";

@InputType()
export class SchoolInfoInput {
  @Field() name: string;
  @Field() description: string;
  @Field() websiteAddress: string;
}

@InputType()
export class ManagerInfoInput {
  @Field() name: string;
  @Field() email: string;
  @Field() phoneNumber: string;
}

@InputType()
export class RegistrationRequestInput {
  @Field() managerInfo: ManagerInfoInput;
  @Field() userInfo: UserCredentialsInput;
  @Field() schoolInfo: SchoolInfoInput;
}