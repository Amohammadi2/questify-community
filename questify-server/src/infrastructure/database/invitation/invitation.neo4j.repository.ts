import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { Invitation } from "src/domain/entities/invitation/invitation.entity";
import { IInvitationPMD, InvitationRepository } from "src/domain/entities/invitation/invitation.repository";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { AppTransactionUnit } from "../transaction-control/app-transaction.unit";
import { InvitationNeo4jMapper } from "./invitation.neo4j.mapper";

@Injectable()
export class InvitationNeo4jRepository extends InvitationRepository {
  
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly mapper: InvitationNeo4jMapper
  ) { super() }

  async findByCode(code: string): Promise<Invitation> {
    const query = `
      MATCH (i:Invitation { code: $code }) RETURN i
    `;
    const { records } = await this.neo4jService.read(query, { code });
    if (records.length === 0)
      return null;
    return this.mapper.toEntity(records[0].get('i').properties);
  }

  async findByInvitor(invitorUserId: string): Promise<Invitation[]> {
    const query = `
      MATCH (i:Invitation)-[:INVITATION_BY]->(u:User { id: $uid }) RETURN i;
    `;
    const { records } = await this.neo4jService.read(query, { uid: invitorUserId })
    return records.map(r => this.mapper.toEntity(r.get('i').properties));
  }
  
  instantiate(): Invitation {
    return new Invitation();
  }

  async remove(tx: AppTransactionUnit, entity: Invitation): Promise<boolean> {
    const query = `
      MATCH (i:Invitation { id: $id }) DETACH DELETE i WITH count(i) > 0 as d RETURN d
    `;
    const params = { id: entity.getId() };
    const { records } = tx
      ? await tx.run('neo4j', query, params)
      : await this.neo4jService.write(query, params);
    return records[0].get('d') as boolean;
  }

  protected async persist(tx: AppTransactionUnit, entity: Invitation, metadata: IInvitationPMD): Promise<boolean> {
    if (!metadata) throw new Error('Metdata should always be provided');
    const query = `
      MATCH (u:User { id: $uid })-[:MANAGER_OF]->(t { id: $tid })
      WITH u, t
      CREATE (t)<-[:INVITATION_TO]-(i:Invitation  $props)-[:INVITATION_BY]->(u)
      RETURN count(i) > 0 as created
    `;
    const params = {
      uid: metadata.invitorId,
      tid: metadata.targetId,
      props: this.mapper.toNeo4j(entity)
    }
    const { records } = tx
      ? await tx.run('neo4j', query, params)
      : await this.neo4jService.write(query, params);
    return records[0].get('created') as boolean;
  }

}