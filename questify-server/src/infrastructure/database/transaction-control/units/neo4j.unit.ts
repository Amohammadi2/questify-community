import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { Neo4jService, Transaction,  } from 'nest-neo4j';
import { Session } from 'neo4j-driver-core';

export class Neo4jTransactionUnit implements ITransactionUnit {
  
  private tx: Transaction;
  private session: Session;
  private isOpen: boolean = true;

  constructor(
    private readonly neo4jService: Neo4jService
  ) {
    this.getTransaction();
  }

  isActive(): boolean {
    return this.isOpen;
  }
  
  async run(dbType: 'neo4j', query: string, params: any) {
    this.assertTxIsOpen();
    const tx = await this.getTransaction();
    return await tx.run(query, params);
  }

  async commit(): Promise<boolean> {
    this.assertTxIsOpen();
    await this.tx.commit();
    await this.session.close();
    this.isOpen = false;
    return true;
  }

  async rollback(): Promise<boolean> {
    this.assertTxIsOpen();
    await this.tx.rollback();
    await this.session.close();
    this.isOpen = false;
    return true;
  }

  private getSession() {
    if (!this.session) {
      this.session = this.neo4jService.getWriteSession();
    }
    return this.session;
  }

  private async getTransaction() {
    if (!this.tx || !this.tx?.isOpen()) {
      this.tx = await this.getSession().beginTransaction();
    }
    return this.tx;
  }

  private assertTxIsOpen() {
    if (!this.isOpen) {
      throw new Error('The transaction is already closed');
    }
  }
}