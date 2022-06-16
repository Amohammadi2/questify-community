import { Injectable } from "@nestjs/common";
import { Neo4jService } from "nest-neo4j/dist";
import Exception, { Result } from "src/exceptions";
import { getProps } from "src/utils/get-props";
import { UserNeo4j } from "./user.neo4j.interface";

export type UserRepoErrorCodes = 'USER_NOT_FOUND';

@Injectable()
export class UserRepository {

  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  public async save(user: UserNeo4j) {
    await this.neo4jService.write(`
      MERGE (u:User {id: $id})
        SET u.username = $username
        SET u.password = $password
        SET u.role = $role
        SET u.profileImgUrl = $profileImgUrl
        SET u.bio = $bio
      RETURN u AS user
    `, user);
  }

  public async findByID(id: number): Promise<Result<UserNeo4j, UserRepoErrorCodes>> {
    const result = await this.neo4jService.read(`
      MATCH (u:User {id: $id}) RETURN u AS user
    `, { id });

    // Todo: think about the design decision to throw exceptions
    // or return status codes for busniess logic errors
    if (result.records.length === 0) {
      return new Result({
        error: {
          code: 'USER_NOT_FOUND',
          message: "Couldn't find the user"
        },
      });
    }

    return new Result({ result: new UserNeo4j(getProps(result, 0, 'user')) });
  }

  public async usernameExists(username: string): Promise<boolean> {
    const result = await this.neo4jService.read(`
      MATCH (u:User {username: $username}) RETURN u AS user
    `, { username });

    return result.records.length > 0;
  }

  public async findByAuthCredentials(credentials: {
    username: string,
    password: string
  }): Promise<Result<UserNeo4j, UserRepoErrorCodes>> {
    const result = await this.neo4jService.read(`
      MATCH (u:User { username: $username, password: $password }) RETURN u AS user
    `);

    if (result.records.length === 0) {
      return new Result({
        error: {
          code: 'USER_NOT_FOUND'
        }
      })
    }

    return new Result({ result: new UserNeo4j(getProps(result, 0, 'user')) });
  }
}