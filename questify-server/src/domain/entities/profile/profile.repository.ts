import { Profile } from "./profile.entity";
import { Repository } from "../../shared/repository.absclass";
import { IAsyncValidator, IValidator } from "../../shared/validator.interface";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";

interface IProfileMetadata {
  userId: string;
}

export abstract class ProfileRepository extends Repository<Profile, IProfileMetadata> {

  abstract getByUserId(userId: string);
  abstract persist(tx: ITransactionUnit, entity: Profile, metadata: IProfileMetadata): Promise<boolean>;
  abstract instantiate(): Profile;
  
  // just to make metatdata required
  save(tx: ITransactionUnit, entity: Profile, metadata: IProfileMetadata) {
    return super.save(tx, entity, metadata);
  }
}