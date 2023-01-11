import { Injectable } from "@nestjs/common";
import { SchoolRole } from "src/domain/entities/school-role/school-role.entity";
import { ISchoolRolePMT, SchoolRoleRepository } from "src/domain/entities/school-role/school-role.repository";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";

@Injectable()
export class SchoolRoleNeo4jRepository extends SchoolRoleRepository {

  instantiate(): SchoolRole {
    throw new Error("Method not implemented.");
  }

  protected persist(tx: ITransactionUnit, entity: SchoolRole, metadata: ISchoolRolePMT): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findByUserId(userId: string): Promise<SchoolRole> {
    throw new Error("Method not implemented.");
  }

  findByUserIdList(userIdList: string[]): Promise<SchoolRole[]> {
    throw new Error("Method not implemented.");
  }
  
  remove(tx: ITransactionUnit, entity: SchoolRole): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}