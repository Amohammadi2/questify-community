import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { Neo4jTransactionUnit } from "./units/neo4j.unit";

export class AppTransactionUnit implements ITransactionUnit {
  
  constructor(
    private readonly neo4jTxUnit: Neo4jTransactionUnit
  ) {}

  private getUnits() {
    return {
      'neo4j': this.neo4jTxUnit
    };
  }

  isActive(): boolean {
    return Object.values(this.getUnits())
      .map(c => c.isActive())
      .reduce((previous, current)=>previous && current);
  }

  async run(dbType: 'neo4j', query: string, params: any) {
    const units = this.getUnits();
    if (!(dbType in units))
      throw new Error('The requested DB to run the query on is not supported: ' + dbType);
    if (!units[dbType].isActive())
      throw new Error('The transaction on the requested DB has ended already: ' + dbType);
    return await units[dbType].run(dbType, query, params);
  }

  async commit(): Promise<boolean> {
    return await Object.values(this.getUnits())
      .filter(unit => unit.isActive())
      .map(async unit => await unit.commit())
      .reduce((previous, current) => previous && current);
  }
  
  async rollback(): Promise<boolean> {
    return await Object.values(this.getUnits())
      .filter(unit => unit.isActive())
      .map(async unit => await unit.rollback())
      .reduce((previous, current) => previous && current);
  }

}