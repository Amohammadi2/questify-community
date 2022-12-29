import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { CredentialsDTO } from "src/domain/dtos/credentials.dto";
import { User } from "src/domain/entities/user/user.entity";
import { UserRepository } from "src/domain/entities/user/user.repository";
import { ITransactionUnit } from "src/domain/integrations/transaction-manager.integration";
import { HashedPassword } from "src/domain/vos/hashed-password.vo";
import { HashService } from "src/infrastructure/hash/hash.service";
import { UserNeo4jMapper } from "./user.neo4j.mapper";
import { UserNeo4j } from "./user.neo4j.model";

@Injectable()
export class UserNeo4jRepository extends UserRepository {
  
  private label: string = 'User';
  
  constructor(
    private readonly hashService: HashService,
    private readonly neo4jService: Neo4jService,
    private readonly userNeo4jMapper: UserNeo4jMapper
  ) { super() }
  
  async findById(id: string): Promise<User> {
    const { records } = await this.neo4jService.read(`MATCH (u:${this.label} { id: $id }) RETURN u`, {
      id
    });
    if (records.length === 0) return null;
    return this.userNeo4jMapper.toEntity(records[0].get('u') as UserNeo4j);
  }
  
  async checkUsernameExists(username: string): Promise<boolean> {
    const { records } = await this.neo4jService.read(
      `RETURN exists((:${this.label} { username: $username })) as e`,
      { username }
    );
    // its always going to have exactly one record
    return records[0].get('e') as boolean;
  }
  
  async findByCredentials({ username, password }: CredentialsDTO): Promise<User> {
    const hashedPassword = new HashedPassword(this.hashService).init(password);
    const { records } = await this.neo4jService.read(`
      MATCH (u:${this.label} { username: $username, password: $password }) RETURN u
    `, { username, password: hashedPassword });
    if (records.length === 0) return null;
    return this.userNeo4jMapper.toEntity(records[0].get('u') as UserNeo4j);
  }

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

}