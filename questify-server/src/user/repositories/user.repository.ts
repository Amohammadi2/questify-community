import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserRepository {

  constructor(
    private readonly neo4jService: Neo4jService
  ) {}
  
  public async save(user: UserModel) {
    await this.neo4jService.write(`
      MERGE (u:User {id: $id})  
        SET u.username = $username
        SET u.password = $password
      RETURN u
    `, user);

    return true;
  }

  public async findOne(id: string): Promise<UserModel> {
    const result = await this.neo4jService.read(`
      MATCH (u:User {id: $id}) return u as user
    `, { id });

    if (result.records.length === 0) {
      return null;
    }

    const { username, password } = result.records[0].get('user').properties;

    new UserModel({ username, password, id });
  }
}