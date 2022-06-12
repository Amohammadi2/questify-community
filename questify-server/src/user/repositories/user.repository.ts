import { Neo4jService } from "nest-neo4j/dist";
import { UserModel } from "../models/user.model";

export class UserRepository {

  constructor(
    private readonly neo4jService: Neo4jService
  ) {}
  
  public async save(user: UserModel) {
    await this.neo4jService.write(`
      MERGE (u:User {id: $id}) SET 
        u.username = $username,
        u.email = $email, 
        u.password = $password
      RETURN u
    `, user);

    return true;
  }

  public async findOne(id: string) {
    const result = await this.neo4jService.read(`
    MATCH (u:User {id: $id}) return u as user
    `, { id });

    if (result.records.length === 0) {
      return null;
    }

    const {
      username, email, password
    } = result.records[0].get('user').properties;

    new UserModel({ username, email, password, id });
  }
}