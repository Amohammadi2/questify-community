import { Invitation } from "src/domain/entities/invitation/invitation.entity";

export interface InvitationRepository {
  findByCode: (code: string)=>Promise<Invitation|null>;
  findByInvitor: (invitorUserId: string)=>Promise<Invitation|null>;
  save: (invitation: Invitation)=>Promise<boolean>;
}