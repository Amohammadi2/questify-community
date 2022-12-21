import { NotFoundErr } from "../exceptions/not-found.exception";
import { InvitationRepository } from "../entities/invitation/invitation.repository";

export class InvitationService {
  
  constructor(
    private readonly invitationRepo: InvitationRepository
  ) {}

  async createInvitation(expiration: Date) {

  }

  async verifyCode(code: string) {
    const invitation = await this.invitationRepo.findByCode(code);
    if (!invitation)
      throw new NotFoundErr('Your invitation code is not valid');
    if (!invitation.isStillValid())
      throw new Error('Your invitation code has been expired');
    return true;
  }

}