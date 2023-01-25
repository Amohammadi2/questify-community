import { Field, InputType } from "@nestjs/graphql";
import { InvitationTarget } from "src/domain/dtos/invitation.dto";

@InputType()
export class GenInvitationCodeInput {
  @Field() expirationDate: string;
  @Field() invitorId: string;
  @Field() targetType: InvitationTarget;
  @Field() targetId: string;
}