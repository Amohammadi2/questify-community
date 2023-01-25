export type InvitationTarget = 'SCHOOL' | 'COMMUNITY';

export class InvitationDTO {
  expirationDate: Date;
  targetType: InvitationTarget;
  targetId: string;
  invitorId: string;
}