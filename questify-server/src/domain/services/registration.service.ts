import { RegistrationRequestDTO } from "../dtos/registration-request.dto";
import { OpertationFailedErr } from "../exceptions/operation-failed.exception";
import { UserRepository } from "../entities/user/user.repository";
import { HashedPassword } from "../vos/hashed-password.vo";
import { IHashService } from "../integrations/hash.service.integration";
import { ProfileRepository } from "../entities/profile/profile.repository";
import { EmailAddress } from "../vos/email-address/email-address.vo";
import { SchoolRepository } from "../entities/school/school.repository";
import { ITransactionManager } from "../integrations/transaction-manager.integration";

export class RegistrationService {

  constructor(
    private readonly mt: ITransactionManager,
    private readonly hashService: IHashService,
    private readonly userRepo: UserRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly schoolRepo: SchoolRepository
  ) {}

  // Todo: Enginear the transaction control system
  async requestRegistration(request: RegistrationRequestDTO) {
    const { username, password } = request.credentials;
    await this.mt.beginTransaction(async tx => {
      // create user
      const user = this.userRepo.instantiate().init({
        username,
        password: await new HashedPassword(this.hashService).init(password),
        isActive: false
      })
      await this.userRepo.save(tx, user);
      // assign the user a profile
      const profile = this.profileRepo.instantiate().init({
        bio: '',
        phoneNumber: request.managerInfo.phoneNumber,
        email: new EmailAddress().init(request.managerInfo.email),
        nickname: request.managerInfo.name
      })
      await this.profileRepo.save(tx, profile, { userId: user.getId() });
      // create a school and assign the user as its manager
      const school = this.schoolRepo.instantiate().init({
        name: request.schoolName,
        websiteAddress: ''
      })
      await this.schoolRepo.save(tx, school, { managerUserId: user.getId() });
    })
    .catch(e=>{ throw new OpertationFailedErr("Couldn't register your request") })
  }

}