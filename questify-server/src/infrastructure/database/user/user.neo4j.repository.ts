import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { CredentialsDTO } from "src/domain/dtos/credentials.dto";
import { User } from "src/domain/entities/user/user.entity";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { IHashService } from "src/domain/integrations/hash.service.integration";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { HashedPassword } from "src/domain/vos/hashed-password.vo";
import { UserNeo4jMapper } from "./user.neo4j.mapper";
import { UserNeo4j } from "./user.neo4j.model";

@Injectable()
export class UserNeo4jRepository extends UserRepository {
  
  private label: string = 'User';
  
  constructor(
    private readonly hashService: IHashService,
    private readonly neo4jService: Neo4jService,
    private readonly userNeo4jMapper: UserNeo4jMapper
  ) { super() }
  
  async findById(id: string): Promise<User> {
    const { records } = await this.neo4jService.read(
      `MATCH (u:${this.label} { id: $id }) RETURN u`, { id }
    );
    if (records.length === 0) return null;
    return this.userNeo4jMapper.toEntity(records[0].get('u').properties as UserNeo4j);
  }
  
  async checkUsernameExists(username: string): Promise<boolean> {
    const { records } = await this.neo4jService.read(
      `MATCH (u:${this.label} { username: $username }) WITH count(u) > 0 as e RETURN e`,
      { username }
    );
    // its always going to have exactly one record
    return records[0].get('e') as boolean;
  }
  
  async findByCredentials({ username, password }: CredentialsDTO): Promise<User> {
    const hashedPassword = await new HashedPassword(this.hashService).init(password);
    console.log('C:', username, hashedPassword.getValue());
    const { records } = await this.neo4jService.read(`
      MATCH (u:${this.label} { username: $username }) RETURN u
    `, { username });
    if (records.length === 0) return null;
    const user = this.userNeo4jMapper.toEntity(records[0].get('u').properties as UserNeo4j);
    if (await user.getPassword().check(password)) {
      return user
    }
    return null;
  }// $2b$10$6GP8mRl3Aj8uQKnpHY.dJuNaX2ZAlvrySQU7K1OmE01sr4lyq.ba.

  protected async persist(tx: ITransactionUnit, user: User): Promise<boolean> {
    const neo4jData = this.userNeo4jMapper.toNeo4j(user);
    const query = `MERGE (u:${this.label} { id: $props.id }) SET u += $props RETURN u.id as id`;

    const result = tx === null
      ? await this.neo4jService.write(query, { props: neo4jData })
      : await tx.run('neo4j', query, { props: neo4jData });

    return result.records[0].get('id') === user.getId();
  }

  instantiate(): User {
    return new User();
  }

  async remove(tx: ITransactionUnit, entity: User): Promise<boolean> {
    const query = `
      MATCH (u:User { id: $uid }) DETACH DELETE u RETURN true
    `;

    const { records } = tx
      ? await tx.run('neo4j', query, { uid: entity.getId() })
      : await this.neo4jService.write(query, { uid: entity.getId() })
      
    return records.length === 0 ? false : true;
  }

}