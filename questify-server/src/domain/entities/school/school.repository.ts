import { Repository } from "src/domain/shared/repository.absclass";
import { IValidator } from "src/domain/shared/validator.interface";
import { School } from "./school.entity";

interface SchoolMetadata {
  managerUserId: string;
}

export abstract class SchoolRepository extends Repository<School, SchoolMetadata> {

  abstract instantiate(): School;
  abstract persist(entity: School, metadata: SchoolMetadata): Promise<boolean>;

}