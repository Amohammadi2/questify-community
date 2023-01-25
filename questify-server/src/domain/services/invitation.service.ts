import { NotFoundErr } from "../exceptions/not-found.exception";
import { InvitationRepository } from "../entities/invitation/invitation.repository";
import { InvitationDTO, InvitationTarget } from "../dtos/invitation.dto";
import { SchoolRepository } from "../entities/school/school.repository";
import { exhaust } from "../utils/exhaust";
import { UserRepository } from "../entities/user/user.repository";
import { ValidationErr } from "../exceptions/validation.exception";

export class InvitationService {
  
  constructor(
    private readonly invitationRepo: InvitationRepository,
    private readonly schoolRepo: SchoolRepository,
    private readonly userRepo: UserRepository
    // private readonly communityRepo: CommunityRepository Todo: Create the comunity repo
  ) {}

  async createInvitation({ expirationDate, targetId, targetType, invitorId } : InvitationDTO): Promise<string> {
    const errors = await this.validateOperation({
      targetId,
      targetType,
      invitorId
    });
    if (errors.length) {
      throw new ValidationErr(errors);
    }
    const invitation = this.invitationRepo.instantiate().init({
      expirationDate: expirationDate
    });
    await this.invitationRepo.save(null, invitation, { targetId, invitorId });
    return invitation.getCode();
  }

  private async validateOperation({ targetType, targetId, invitorId} : Pick<InvitationDTO, 'invitorId' | 'targetId' | 'targetType'>) {
    const errors = [];
    switch(targetType) {
      case "SCHOOL":
        if (!(await this.schoolRepo.checkExists(targetId)))
          errors.push('The school does not exist');
        break;
      case "COMMUNITY":
        throw new Error('Community module is not still implemented');
      default:
        exhaust(targetType);
    }
    if (!(await this.userRepo.checkIdExists(invitorId)))
      errors.push('The invitor id does not exist');
    return errors;
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