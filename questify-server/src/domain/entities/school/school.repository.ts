import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { Repository } from "src/domain/shared/repository.absclass";
import { IValidator } from "src/domain/shared/validator.interface";
import { School } from "./school.entity";

export interface SchoolMetadata {
  managerUserId: string;
}

export type Role = {
  type: 'STUDENT' | 'TEACHER' | 'MANAGER';
  schoolName: string;
  schoolId: string;
  
}

export abstract class SchoolRepository extends Repository<School, SchoolMetadata> {

  abstract instantiate(): School;
  abstract persist(tx: ITransactionUnit, entity: School, metadata: SchoolMetadata): Promise<boolean>;

  abstract getUserRoles(userId: string): Promise<Role[]>;
  abstract findByManager(managerUserId: string);
  abstract findByStudent(studentUserId: string);

}