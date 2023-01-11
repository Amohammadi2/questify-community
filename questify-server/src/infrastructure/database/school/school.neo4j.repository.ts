import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { School } from "src/domain/entities/school/school.entity";
import { SchoolMetadata, SchoolRepository } from "src/domain/entities/school/school.repository";
import { AppTransactionUnit } from "../transaction-control/app-transaction.unit";
import { SchoolNeo4jMapper } from "./school.neo4j.mapper";

@Injectable()
export class SchoolNeo4jRepository extends SchoolRepository {
  
  private label: string = 'School'

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly neo4jMapper: SchoolNeo4jMapper
  ) { super(); }

  instantiate(): School {
    return new School();
  }

  private async checkExistsAlready(id: string) {
    return (await this.neo4jService.read(`MATCH (s:${this.label} { id: $id }) WITH count(s) > 0 as e RETURN e`, { id }))
      .records[0].get('e')
  }
  
  async persist(tx: AppTransactionUnit, school: School, metadata: SchoolMetadata): Promise<boolean> {
    if (await this.checkExistsAlready(school.getId())) {
      const removeOwnerQuery = `
        MATCH (:${this.label} { id: $sid })-[rel:OWNED_BY]->(:User)
        REMOVE rel;
      `;
      const updateQuery = `
        MATCH (s:${this.label} { id: $sid })
        SET s += $props
        WITH s
        CREATE (s)-[:OWNED_BY]->(u:User { id: $nid })
      `;
      if (tx) {
        await tx.run('neo4j', removeOwnerQuery, {
          sid: school.getId(),
        })
        await tx.run('neo4j', updateQuery, {
          sid: school.getId(),
          props: this.neo4jMapper.toNeo4j(school),
          nid: metadata.managerUserId
        }) // if it errors, it will be handled automatically by the transaction manager
        return true;
      }
      else {
        const session = this.neo4jService.getWriteSession();
        const t = await session.beginTransaction()
        await t.run(removeOwnerQuery, {
          sid: school.getId(),
        })
        await t.run(updateQuery, {
          sid: school.getId(),
          props: this.neo4jMapper.toNeo4j(school),
          nid: metadata.managerUserId
        })
        t.commit();
        session.close();
        return true;
      }
    }
    else {
      const query = `MATCH (u:User { id: $ownerId }) WITH u CREATE (s:${this.label} $props)-[:OWNED_BY]->(u) RETURN true`;
      const { records } = tx
        ? await tx.run('neo4j', query, {
          props: this.neo4jMapper.toNeo4j(school),
          ownerId: metadata.managerUserId
        })
        : await this.neo4jService.write(query, {
          props: this.neo4jMapper.toNeo4j(school),
          ownerId: metadata.managerUserId
        })
      return records.length !== 0;
    }
  }

  async remove(tx: AppTransactionUnit, entity: School): Promise<boolean> {
    const query = `
      MATCH (s:School { id: $sid }) DETACH DELETE s RETURN true
    `;

    const params = { sid: entity.getId() };

    const { records } = tx
      ? await tx.run('neo4j', query, params)
      : await this.neo4jService.write(query, params);

    return records.length !== 0;
  }
} 