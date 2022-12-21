import { Profile } from "./profile.entity";
import { Repository } from "../../shared/repository.absclass";
import { IValidator } from "../../shared/validator.interface";

interface IProfileMetadata {
  userId: string;
}

export abstract class ProfileRepository extends Repository<Profile, IProfileMetadata> {

  abstract getByUserId(userId: string);
  abstract getValidator(): IValidator<Profile>;
  abstract persist(entity: Profile, metadata: IProfileMetadata): Promise<boolean>;
  abstract instantiate(): Profile;
  
  // just to make metatdata required
  save(entity: Profile, metadata: IProfileMetadata) {
    return super.save(entity, metadata);
  }
}