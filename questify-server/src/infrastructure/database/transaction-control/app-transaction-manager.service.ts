import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { ITransactionManager, ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { AppTransactionUnit } from "./app-transaction.unit";
import { Neo4jTransactionUnit } from "./units/neo4j.unit";

@Injectable()
export class AppTransactionManager implements ITransactionManager {
  
  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  beginTransaction<Result>(callback: (tx: ITransactionUnit) => Promise<Result>): Promise<Result> {
    const txUnit = new AppTransactionUnit(
      new Neo4jTransactionUnit(this.neo4jService)
    );
    return callback(txUnit);
  }

}