import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { School } from "src/domain/entities/school/school.entity";
import { SchoolMetadata, SchoolRepository, Role } from "src/domain/entities/school/school.repository";
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
      .records[0].get('e');
  }
  
  async persist(tx: AppTransactionUnit, school: School, metadata: SchoolMetadata): Promise<boolean> {
    if (await this.checkExistsAlready(school.getId())) {
      const removeOwnerQuery = `
        MATCH (:${this.label} { id: $sid })<-[rel:MANAGER_OF]-(:User)
        REMOVE rel;
      `;
      const updateQuery = `
        MATCH (s:${this.label} { id: $sid })
        SET s += $props
        WITH s
        CREATE (s)<-[:MANAGER_OF]-(u:User { id: $nid })
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
        const t = await session.beginTransaction();
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
      const query = `MATCH (u:User { id: $ownerId }) WITH u CREATE (s:${this.label} $props)<-[:MANAGER_OF]-(u) RETURN true`;
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

  async getUserRoles(userId: string): Promise<Role[]> {
    
    const query = `
      OPTIONAL MATCH (u:User { id: $uid })-[:MANAGER_OF]->(s1:School)
      OPTIONAL MATCH (u)-[:STUDENT_OF]->(s2:School)
      OPTIONAL MATCH (u)-[:TEACHER_OF]->(s3:School)
      RETURN u as user, collect(s1) as manager, collect(s2) as student, collect(s3) as teacher
    `;

    const { records } = await this.neo4jService.read(query, { uid: userId })

    console.log(records[0].get('manager'))

    if (records.length === 0)
      return [];

    return [
      ...records[0].get('manager').map(({ properties }) => ({
        type: 'MANAGER',
        schoolName: properties.name,
        schoolId: properties.id
      })),
      ...records[0].get('student').map(({ properties }) => ({
        type: 'STUDENT',
        schoolName: properties.name,
        schoolId: properties.id
      })),
      ...records[0].get('teacher').map(({ properties }) => ({
        type: 'TEACHER',
        schoolName: properties.name,
        schoolId: properties.id
      })),
    ]
  }

  findByManager(managerUserId: string): Promise<School> {
    throw new Error("Method not implemented.");
  }

  findByStudent(studentUserId: string): Promise<School> {
    throw new Error("Method not implemented.");
  }

  async checkExists(id: string): Promise<boolean> {
    const query = `
      MATCH (s:School { id: $sid }) WITH count(s) > 0 as e RETURN e;
    `;
    const { records } = await this.neo4jService.read(query, { sid: id });
    return records[0].get('e') as boolean;
  }
} 